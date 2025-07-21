package developer.interview.market_trading_app_server.controller;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;

import developer.interview.market_trading_app_server.entity.Stock;
import developer.interview.market_trading_app_server.entity.TradeRequest;
import developer.interview.market_trading_app_server.service.MarketService;
import developer.interview.market_trading_app_server.service.MarketSimulationService;

@RestController
@RequestMapping("/api/market")
public class MarketController {
    @Autowired MarketService marketService;
    @Autowired MarketSimulationService marketSimulationService;

    @GetMapping("/init")
    public List<Stock> init() {
        return marketService.initMarket();
    }

    @PostMapping("/buy")
    public void buy(@RequestBody TradeRequest req) {
        marketService.buy(req.stockId, req.quantity);
    }

    @PostMapping("/sell")
    public void sell(@RequestBody TradeRequest req) {
        marketService.sell(req.stockId, req.quantity);
    }

    @GetMapping
    public Collection<Stock> all() {
        return marketService.getMarket();
    }

    @GetMapping("/simulate/start")
    public String simulate() throws JsonProcessingException {
       if (marketService.getMarket() == null) return null;
        List<String> stockIds = marketService.getMarket().stream().map(Stock::getId).collect(Collectors.toList());;
        marketSimulationService.startSimulation(stockIds);
        return "Simulation started";
    }

    @GetMapping("/simulate/stop")
    public String stop(){
        marketSimulationService.stopSimulation();
        return "Simulation stopped";
    }

}
