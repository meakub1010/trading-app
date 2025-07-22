import { render, screen } from "@testing-library/react";
import { Blotter } from "./Blotter";
import { Stock } from "../../../types/types";

// Mock StockRow to avoid deep rendering
jest.mock("../../market/components/StockRow", () => ({
  StockRow: ({ s }: { s: Stock }) => <tr data-testid="stock-row"><td>{s.ticker}</td></tr>
}));

const mockStocks: Stock[] = [
  { id: '1', ticker: "AAPL", quantity: 10, availableShares: 100, price: 150, name: "Apple", marketCap: 1500 },
  { id: '2', ticker: "TSLA", quantity: 0, availableShares: 50, price: 700, name: "Tesla", marketCap: 2800 },
  { id: '3', ticker: "GOOG", quantity: 5, availableShares: 80, price: 2800, name: "Google", marketCap: 14000 },
];

describe("Blotter component", () => {
  it("renders purchased stocks only (quantity > 0)", () => {
    render(
      <Blotter
        stocks={mockStocks}
        onCallback={jest.fn()}
        actionTitle="Sell"
      />
    );

    // Check title
    expect(screen.getByText(/Purchased Stocks/i)).toBeInTheDocument();

    // Should only render 2 rows (AAPL and GOOG)
    const rows = screen.getAllByTestId("stock-row");
    expect(rows.length).toBe(2);

    // Verify filtered rows content
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOG")).toBeInTheDocument();
    expect(screen.queryByText("TSLA")).not.toBeInTheDocument();
  });
});
