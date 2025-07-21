package developer.interview.market_trading_app_server.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

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
    private volatile boolean isRunning = false;
    private final Random random = new Random();


    public synchronized String startSimulation(List<String> keys)  throws JsonProcessingException {
        if (isRunning) return "Simulation already running.";

        isRunning = true;

        simulationTask = scheduler.scheduleAtFixedRate(() -> {
            if (!isRunning) return;

            try {
                String actionUrl = random.nextBoolean() ? "/market/buy" : "/market/sell";
            int quantity = random.nextInt(5) + 1;
            String ticker = randomTicker();
            double price = Math.round((100 + random.nextDouble() * 50) * 100.0) / 100.0;

            Map<String, Object> payload = new HashMap<>();
            payload.put("stockId", keys.get(random.nextInt(keys.size())));
            payload.put("quantity", quantity);

            ObjectMapper mapper = new ObjectMapper();
            String jsonPayload = mapper.writeValueAsString(payload);

            webClient.post()
            .uri("http://localhost:8080/api" + actionUrl)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .bodyValue(jsonPayload)
            .retrieve()
            .bodyToMono(String.class)
            .subscribe(response -> {
                System.out.println("Response: " + response);
            }, error -> {
                System.err.println("Error: " + error.getMessage());
            });
            System.out.printf("Simulated %s %d of %s at $%.2f%n", actionUrl, quantity, ticker, price);
            }
            catch(JsonProcessingException e){
                e.printStackTrace();
            }
        }, 0, 10, TimeUnit.NANOSECONDS);

        return "Simulation started.";
    }

    public synchronized String stopSimulation() {
        isRunning = false;
        System.out.println("Simulation stopping");
        if (simulationTask != null) {
            System.out.println("Simulation ..stopping");
            simulationTask.cancel(true);
        }
        System.out.println("Simulation stopped");
        return "Simulation stopped.";
    }

    private String randomTicker() {
        String[] tickers = {"AAPL", "GOOG", "AMZN", "MSFT", "TSLA"};
        return tickers[random.nextInt(tickers.length)];
    }

    @PreDestroy
    public void shutdown() {
        scheduler.shutdownNow();
    }
}