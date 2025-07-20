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
    
    //@Scheduled(initialDelay = 1000, fixedRate = 10000)
    public void publishData(){
        String[] tickers = {
        "AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META", "NVDA", "NFLX", "INTC", "AMD",
        "BABA", "UBER", "LYFT", "ORCL", "IBM", "ADBE", "CRM", "SHOP", "SQ", "PYPL",
        "BA", "JPM", "GS", "BAC", "WFC", "CNG", "DIS", "NKE", "TBN", "VZO",
        "PEP", "KO", "PFE", "MRNA", "JNJ", "CVX", "XOM", "BP", "WMT", "COST",
        "TGT", "HD", "LOW", "MCD", "SBUX", "TSM", "QCOM", "ZM", "DOCU", "PLTR"
        };

        for (int i = 0; i < tickers.length; i++) {
            String id = String.format("STOCK-%03d", i + 1); // deterministic ID
            String ticker = tickers[i];
            Stock s = new Stock(id, ticker, "Stock-" + ticker, 100 + i, 50 + (Math.random() * 100), 100 + i, 0);
            market.put(id, s);
        }
        //messagingTemplate.convertAndSend("/topic/stock", market);
        //System.out.println("data publishing: " + market.size());
    }
}