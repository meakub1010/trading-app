package developer.interview.market_trading_app_server.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import developer.interview.market_trading_app_server.entity.Stock;
import developer.interview.market_trading_app_server.service.MarketService;
import developer.interview.market_trading_app_server.service.MarketSimulationService;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*")
public class MarketController {
    @Autowired MarketService marketService;
    @Autowired MarketSimulationService marketSimulationService;

    @GetMapping("/init")
    public List<Stock> init() {
        return marketService.initMarket();
    }

    @PostMapping("/buy")
    public void buy(@RequestBody Stock req) {
        marketService.buy(req.getId(), req.getQuantity());
    }

    @PostMapping("/sell")
    public void sell(@RequestBody Stock req) {
        marketService.sell(req.getId(), req.getQuantity());
    }

    @GetMapping
    public Collection<Stock> all() {
        return marketService.getMarket();
    }

    @GetMapping("/simulate/start")
    public String simulate(){

        return "Simulation started";
    }

    @GetMapping("/simulate/stop")
    public String stop(){
        
        return "Simulation stopped";
    }

}
