package developer.interview.market_trading_app_server.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import developer.interview.market_trading_app_server.entity.Stock;

@Service
public class DataPushService {
    private Map<String, Stock> market = new ConcurrentHashMap<>();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Scheduled(initialDelay = 1000, fixedRate = 100000)
    public void publishData(){
        for (int i = 1; i <= 100; i++) {
            String id = UUID.randomUUID().toString();
            Stock s = new Stock(id, "TICK" + i, "Stock-" + i, 100 + i, 50 + (Math.random() * 100), 100 + i, 0);
            market.put(id, s);
        }
        //messagingTemplate.convertAndSend("/topic/stock", market);
        System.out.println("data publishing: " + market.size());
    }
}