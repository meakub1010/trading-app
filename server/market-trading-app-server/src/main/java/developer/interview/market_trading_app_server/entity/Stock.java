package developer.interview.market_trading_app_server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    private String id;
    private String ticker;
    private String name;
    private int quantity;
    private double price;
    private int availableShares;
    private double marketCap;
}
