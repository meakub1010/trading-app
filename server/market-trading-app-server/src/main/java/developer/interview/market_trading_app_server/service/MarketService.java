package developer.interview.market_trading_app_server.service;
import developer.interview.market_trading_app_server.entity.Stock;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MarketService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    private Map<String, Stock> market = new ConcurrentHashMap<>();
    
    public List<Stock> initMarket() {
        market.clear();
        String[] tickers = {
        "AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META", "NVDA", "NFLX", "INTC", "AMD",
        "BABA", "UBER", "LYFT", "ORCL", "IBM", "ADBE", "CRM", "SHOP", "SQ", "PYPL",
        "BA", "JPM", "GS", "BAC", "WFC", "C", "DIS", "NKE", "T", "VZ",
        "PEP", "KO", "PFE", "MRNA", "JNJ", "CVX", "XOM", "BP", "WMT", "COST",
        "TGT", "HD", "LOW", "MCD", "SBUX", "TSM", "QCOM", "ZM", "DOCU", "PLTR"
        };
        
        Random random = new Random();

        for (int i = 0; i < tickers.length; i++) {
            String id = String.format("STOCK-%03d", i + 1);
            String ticker = tickers[i];
            String name = "Stock-" + ticker;
            int quantity = 0; 
            int availableQuantity = 10 + random.nextInt(991);
            double pricePerShare = 50 + (random.nextDouble() * 450);
            double marketCap = 0.0d;

        Stock stock = new Stock(
            id,
            ticker,
            name,
            quantity,
            pricePerShare,
            availableQuantity,
            marketCap
        );
        market.put(id, stock);
        }

        List<Stock> marketData = new ArrayList<>(market.values());

        messagingTemplate.convertAndSend("/topic/stock", marketData);

        return marketData;
    }

     public Collection<Stock> getMarket() {
        return market.values();
    }

    public String getRandomStockId() {
        if (market.isEmpty()) return null;
        List<String> keys = new ArrayList<>(market.keySet());
        Random random = new Random();
        return keys.get(random.nextInt(keys.size()));
    }

    public void buy(String id, int qty) {
        Stock stock = market.get(id);

        if(stock.getAvailableShares() < qty){
            throw new RuntimeException("Not enough shares to buy");
        }
        stock.setQuantity(stock.getQuantity() + qty);
        stock.setAvailableShares(stock.getAvailableShares() - qty);
        
        stock.setMarketCap(stock.getQuantity() * stock.getPrice());
        market.put(id, stock);
        
        // publish
        messagingTemplate.convertAndSend("/topic/stock", new Stock[]{stock});
    }

    public void sell(String id, int qty) {
        Stock stock = market.get(id);

        if(stock.getQuantity() < qty){
            throw new RuntimeException("You don't have enough shares to sell");
        }
        stock.setQuantity(stock.getQuantity() - qty);
        stock.setAvailableShares(stock.getAvailableShares() + qty);
        stock.setMarketCap(stock.getQuantity() * stock.getPrice());

        // publish
        messagingTemplate.convertAndSend("/topic/stock", new Stock[]{stock});
    }
}
