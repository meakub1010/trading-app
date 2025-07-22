import { mergeStocks } from "../utils/mergeStocks";
import { Stock } from "../types/types";

describe("mergeStocks", () => {
  const prevStocks: Stock[] = [
    {
      id: "1",
      ticker: "AAPL",
      name: "Apple Inc.",
      quantity: 10,
      availableShares: 100,
      price: 150,
      marketCap: 1500 // 150 * 10
    },
    {
      id: "2",
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 5,
      availableShares: 50,
      price: 2800,
      marketCap: 14000 // 2800 * 5
    }
  ];

  it("should merge updated stock values", () => {
    const updates: Stock[] = [
      {
        id: "1",
        ticker: "AAPL",
        name: "Apple Inc.",
        quantity: 20,
        availableShares: 80,
        price: 155,
        marketCap: 3100 // 155 * 20
      }
    ];

    const result = mergeStocks(prevStocks, updates);

    expect(result).toHaveLength(2);
    const updated = result.find(s => s.id === "1");
    expect(updated).toEqual({
      id: "1",
      ticker: "AAPL",
      name: "Apple Inc.",
      quantity: 20,
      availableShares: 80,
      price: 155,
      marketCap: 3100
    });
  });

  it("should add new stocks if not in previous list", () => {
    const updates: Stock[] = [
      {
        id: "3",
        ticker: "MSFT",
        name: "Microsoft Corp.",
        quantity: 15,
        availableShares: 60,
        price: 300,
        marketCap: 4500 // 300 * 15
      }
    ];

    const result = mergeStocks(prevStocks, updates);
    expect(result).toHaveLength(3);
    expect(result.find(s => s.id === "3")).toEqual({
      id: "3",
      ticker: "MSFT",
      name: "Microsoft Corp.",
      quantity: 15,
      availableShares: 60,
      price: 300,
      marketCap: 4500
    });
  });

  it("should return original list if no updates", () => {
    const result = mergeStocks(prevStocks, []);
    expect(result).toEqual(prevStocks);
  });
});
