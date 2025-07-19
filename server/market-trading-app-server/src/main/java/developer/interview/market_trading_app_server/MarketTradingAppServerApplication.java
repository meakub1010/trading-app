package developer.interview.market_trading_app_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MarketTradingAppServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarketTradingAppServerApplication.class, args);
	}
}
