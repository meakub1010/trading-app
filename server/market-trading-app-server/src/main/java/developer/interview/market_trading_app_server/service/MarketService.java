package developer.interview.market_trading_app_server.service;
import developer.interview.market_trading_app_server.entity.Stock;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MarketService {
    @Autowired
    private SimpMessagingTemplate template;


    private Map<String, Stock> market = new ConcurrentHashMap<>();
    private Map<String, Stock> purchasedMap = new ConcurrentHashMap<>(); 
    
    public List<Stock> initMarket() {
        market.clear();
        for (int i = 1; i <= 10; i++) {
            String id = UUID.randomUUID().toString();
            Stock s = new Stock(id, "TICK" + i, "Stock-" + i, 100 + i, 50 + (Math.random() * 100), 100 + i, 0);
            market.put(id, s);
        }

        return new ArrayList<>(market.values());
    }

     public Collection<Stock> getMarket() {
        return market.values();
    }

    public void buy(String id, int qty) {
        Stock s = market.get(id);
        s.setAvailableShares(s.getAvailableShares() - qty);
        s.setMarketCap((s.getQuantity() - s.getAvailableShares()) * s.getPrice());
    }

    public void sell(String id, int qty) {
        Stock s = market.get(id);
        s.setAvailableShares(s.getAvailableShares() + qty);
        s.setMarketCap((s.getQuantity() - s.getAvailableShares()) * s.getPrice());
    }
}
