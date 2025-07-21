package developer.interview.market_trading_app_server.entity;

public class TradeRequest {
    public String stockId;
    public int quantity;
    public TradeRequest(String stockId, int quantity) {
        super();
        this.stockId = stockId;
        this.quantity = quantity;
    }
}
