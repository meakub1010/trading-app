package developer.interview.market_trading_app_server;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import developer.interview.market_trading_app_server.controller.MarketController;
import developer.interview.market_trading_app_server.entity.Stock;
import developer.interview.market_trading_app_server.entity.TradeRequest;
import developer.interview.market_trading_app_server.service.MarketService;
import developer.interview.market_trading_app_server.service.MarketSimulationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

@WebMvcTest(MarketController.class)
public class MarketControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MarketService marketService;

    @MockBean
    private MarketSimulationService marketSimulationService;

    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    public void setup() {
        // optional: setup common mocks
    }

    @Test
    public void testInit() throws Exception {
        when(marketService.initMarket()).thenReturn(List.of());

        mockMvc.perform(get("/api/market/init"))
            .andExpect(status().isOk());
        verify(marketService, times(1)).initMarket();
    }

    @Test
    public void testBuy() throws Exception {
        TradeRequest req = new TradeRequest("STOCK-001", 5);

        mockMvc.perform(post("/api/market/buy")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(req)))
            .andExpect(status().isOk());

        verify(marketService, times(1)).buy(req.stockId, req.quantity);
    }

    @Test
    public void testSell() throws Exception {
        TradeRequest req = new TradeRequest("STOCK-001", 5);

        mockMvc.perform(post("/api/market/sell")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(req)))
            .andExpect(status().isOk());

        verify(marketService, times(1)).sell(req.stockId, req.quantity);
    }

    @Test
    public void testAll() throws Exception {
        when(marketService.getMarket()).thenReturn(List.of());

        mockMvc.perform(get("/api/market"))
            .andExpect(status().isOk());

        verify(marketService, times(1)).getMarket();
    }

    @Test
    public void testSimulateStart() throws Exception {
        when(marketService.getMarket()).thenReturn(List.of(new Stock()));
        when(marketSimulationService.startSimulation(any())).thenReturn("someExpectedResult"); // mock the return value

        mockMvc.perform(get("/api/market/simulate/start"))
            .andExpect(status().isOk())
            .andExpect(content().string("Simulation started"));

        verify(marketSimulationService, times(1)).startSimulation(any());
    }


    @Test
    public void testSimulateStop() throws Exception {
       when(marketSimulationService.stopSimulation()).thenReturn("someExpectedResult"); // mock the return value

        mockMvc.perform(get("/api/market/simulate/stop"))
            .andExpect(status().isOk())
            .andExpect(content().string("Simulation stopped"));

        verify(marketSimulationService, times(1)).stopSimulation();
    }

}
