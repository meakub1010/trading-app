import {http} from './client';
import type {Stock} from '../types/types';

export const marketApi = {
    initMarket: () => {
        return http<void>('/market/init', {method: 'GET'})
    },
    startSimulation: () => {
        return http<void>('/market/simulate/start',{method: 'GET'})
    },
    stopSimulation: () => {
        return http<void>('/market/simulate/stop',{method: 'GET'})
    },
    buy: (id: String, quantity: number) => {
        const payload = {stockId: id, quantity: quantity};
        return http<Stock>('/market/buy', {method: 'POST', body: JSON.stringify(payload)});
    },
    sell: (id: String, quantity: number) => {
        const payload = {stockId: id, quantity: quantity};
        return http<Stock>('/market/sell', {method: 'POST', body: JSON.stringify(payload)});
    },
};