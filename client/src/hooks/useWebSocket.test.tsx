import { Stomp } from '@stomp/stompjs';

// After import, get the mock and spy on `activate`
const stompOverMock = (Stomp.over as jest.Mock);
const activateMock = jest.fn();

beforeEach(() => {
  // Reset and override the mock implementation:
  activateMock.mockClear();
  stompOverMock.mockImplementation(() => ({
    activate: activateMock,
    deactivate: jest.fn(),
    subscribe: jest.fn(),
    connected: true,
    reconnectDelay: 0,
    debug: jest.fn(),
    onConnect: undefined,
  }));
});

jest.mock('@stomp/stompjs', () => {
  return {
    Stomp: {
      over: jest.fn(() => ({
        activate: jest.fn(),
        deactivate: jest.fn(),
        subscribe: jest.fn(),
        connected: true,
        reconnectDelay: 0,
        debug: jest.fn(),
        onConnect: undefined,
      })),
    },
  };
});


jest.mock('sockjs-client', () => {
  return jest.fn(() => ({}));  // dummy SockJS instance
});

// Import React and your hook
import React from 'react';
import { render } from '@testing-library/react';
import { useWebSocket } from './useWebSocket';

// Simple test component using the hook
function TestComponent({ onConnect }: { onConnect: () => void }) {
  useWebSocket('http://localhost:8080/ws', { onConnect });
  return <div>Test WebSocket</div>;
}

test('calls activate and sets onConnect', () => {
  const onConnect = jest.fn();

  render(<TestComponent onConnect={onConnect} />);

  expect(activateMock).toHaveBeenCalledTimes(1);
});
