package developer.interview.market_trading_app_server.service;

import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.annotation.PreDestroy;

@Service
public class MarketSimulationService {
    
    @Autowired WebClient webClient;

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> simulationTask;
    private volatile boolean isRunning = false;
    private final Random random = new Random();


    public synchronized String startSimulation() {
        if (isRunning) return "Simulation already running.";

        isRunning = true;

        simulationTask = scheduler.scheduleAtFixedRate(() -> {
            if (!isRunning) return;

            String action = random.nextBoolean() ? "BUY" : "SELL";
            int quantity = random.nextInt(100) + 1;
            String ticker = randomTicker();
            double price = Math.round((100 + random.nextDouble() * 50) * 100.0) / 100.0;


            webClient.get()
                .uri("")
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(response -> {
                    System.out.println("Response: " + response);
                }, error -> {
                    System.out.println("Error: " + error);
                });

            // Simulate a trade (you can also POST this to a trade endpoint, log, etc.)
            System.out.printf("Simulated %s %d of %s at $%.2f%n", action, quantity, ticker, price);

        }, 0, 5, TimeUnit.SECONDS); // every 5 seconds

        return "Simulation started.";
    }

    public synchronized String stopSimulation() {
        isRunning = false;
        if (simulationTask != null) {
            simulationTask.cancel(true);
        }
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