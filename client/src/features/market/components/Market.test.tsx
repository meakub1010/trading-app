import React from 'react';
import { render, screen } from '@testing-library/react';
import { Market } from './Market';
import { StockProps } from '../../../types/types';

// Mock StockRow component to isolate Market test
jest.mock('./StockRow', () => ({
  StockRow: ({ s }: any) => (
    <tr data-testid="stock-row">
      <td>{s.id}</td>
      <td>{s.ticker}</td>
      <td>{s.quantity}</td>
      <td>{s.availableShares}</td>
      <td>{s.price}</td>
      <td>{s.name}</td>
      <td>{s.marketCap}</td>
    </tr>
  ),
}));

describe('Market Component', () => {
  const mockStocks: StockProps['stocks'] = [
    {
      id: '1',
      ticker: 'AAPL',
      quantity: 10,
      availableShares: 90,
      price: 150,
      name: 'Apple Inc.',
      marketCap: 1500,
    },
    {
      id: '2',
      ticker: 'GOOG',
      quantity: 5,
      availableShares: 95,
      price: 2800,
      name: 'Alphabet Inc.',
      marketCap: 14000,
    },
  ];

  const mockCallback = jest.fn();

  it('renders table with stock rows', () => {
    render(<Market stocks={mockStocks} onCallback={mockCallback} actionTitle="Buy" />);

    // Table header
    expect(screen.getByText('Market Stocks')).toBeInTheDocument();
    expect(screen.getByText('Ticker')).toBeInTheDocument();

    // Stock rows
    const rows = screen.getAllByTestId('stock-row');
    expect(rows).toHaveLength(2);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOG')).toBeInTheDocument();
  });
});
