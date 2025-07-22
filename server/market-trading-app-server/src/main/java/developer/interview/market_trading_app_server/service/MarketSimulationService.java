package developer.interview.market_trading_app_server.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PreDestroy;

@Service
public class MarketSimulationService {
    
    @Autowired WebClient webClient;

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> simulationTask;
    private final AtomicBoolean isRunning = new AtomicBoolean(false);
    private final Random random = new Random();
    private final String WS_URL = "http://localhost:8080/api";

    public synchronized String startSimulation(List<String> keys)  throws JsonProcessingException {
        if (!isRunning.compareAndSet(false, true)) return "Simulation already running.";

   
        simulationTask = scheduler.scheduleAtFixedRate(() -> {
            if (!isRunning.get()) return;

            try {
                String actionUrl = random.nextBoolean() ? "/market/buy" : "/market/sell";
                int quantity = random.nextInt(5) + 1;
                double price = Math.round((100 + random.nextDouble() * 50) * 100.0) / 100.0;

                Map<String, Object> payload = new HashMap<>();
                payload.put("stockId", keys.get(random.nextInt(keys.size())));
                payload.put("quantity", quantity);

                ObjectMapper mapper = new ObjectMapper();
                String jsonPayload = mapper.writeValueAsString(payload);

                webClient.post()
                .uri(WS_URL + actionUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(jsonPayload)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(response -> {
                    System.out.println("Response: " + response);
                }, error -> {
                    System.err.println("Error: " + error.getMessage());
                });
                System.out.printf("Simulated %s %d of %s at $%.2f%n", actionUrl, quantity, payload.get("stockId"), price);
            }
            catch(JsonProcessingException e){
                e.getStackTrace();
            }
        }, 0, 100, TimeUnit.MILLISECONDS);

        return "Simulation started.";
    }

    public synchronized String stopSimulation() {
        isRunning.set(false);
        System.out.println("Simulation stopping");
        if (simulationTask != null) {
            System.out.println("Simulation ..stopping");
            simulationTask.cancel(true);
        }
        System.out.println("Simulation stopped");
        return "Simulation stopped.";
    }

    @PreDestroy
    public void shutdown() {
        isRunning.set(false);
        scheduler.shutdownNow();
    }
}