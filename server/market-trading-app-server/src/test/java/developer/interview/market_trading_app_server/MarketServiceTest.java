package developer.interview.market_trading_app_server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import developer.interview.market_trading_app_server.entity.Stock;
import developer.interview.market_trading_app_server.service.MarketService;

public class MarketServiceTest {
     @InjectMocks
    private MarketService marketService;

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testInitMarket() {
        var stocks = marketService.initMarket();
        assertNotNull(stocks);
        assertFalse(stocks.isEmpty());
        verify(messagingTemplate, times(1)).convertAndSend(eq("/topic/stock"), ArgumentMatchers.<Stock>any());
    }

     @Test
    public void testBuySuccessfully() {
        marketService.initMarket();
        var stockId = marketService.getRandomStockId();
        assertNotNull(stockId);

        var before = marketService.getMarket().stream()
            .filter(s -> s.getId().equals(stockId)).findFirst().get();

        int buyQty = 1;
        int availableBefore = before.getAvailableShares();
        int quantityBefore = before.getQuantity();

        marketService.buy(stockId, buyQty);

        var after = marketService.getMarket().stream()
            .filter(s -> s.getId().equals(stockId)).findFirst().get();

        assertEquals(quantityBefore + buyQty, after.getQuantity());
        assertEquals(availableBefore - buyQty, after.getAvailableShares());
        verify(messagingTemplate, times(2)).convertAndSend(eq("/topic/stock"), ArgumentMatchers.<Stock>any());
    }

     @Test
    public void testBuyThrowsWhenNotEnoughShares() {
        marketService.initMarket();
        var stockId = marketService.getRandomStockId();
        assertNotNull(stockId);

        var stock = marketService.getMarket().stream()
            .filter(s -> s.getId().equals(stockId)).findFirst().get();

        int tooMany = stock.getAvailableShares() + 1000;

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            marketService.buy(stockId, tooMany);
        });

        assertEquals("Not enough shares to buy", exception.getMessage());
    }

    @Test
    public void testSellSuccessfully() {
        marketService.initMarket();
        var stockId = marketService.getRandomStockId();
        assertNotNull(stockId);

        // First buy some shares to sell
        marketService.buy(stockId, 5);

        var stock = marketService.getMarket().stream()
            .filter(s -> s.getId().equals(stockId)).findFirst().get();

        int quantityBefore = stock.getQuantity();
        int availableBefore = stock.getAvailableShares();

        int sellQty = 3;
        marketService.sell(stockId, sellQty);

        var after = marketService.getMarket().stream()
            .filter(s -> s.getId().equals(stockId)).findFirst().get();

        assertEquals(quantityBefore - sellQty, after.getQuantity());
        assertEquals(availableBefore + sellQty, after.getAvailableShares());
        verify(messagingTemplate, atLeastOnce()).convertAndSend(eq("/topic/stock"), ArgumentMatchers.<Stock>any());
    }

    @Test
    public void testSellThrowsWhenNotEnoughShares() {
        marketService.initMarket();
        var stockId = marketService.getRandomStockId();
        assertNotNull(stockId);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            marketService.sell(stockId, 1000000);
        });

        assertEquals("You don't have enough shares to sell", exception.getMessage());
    }

}
