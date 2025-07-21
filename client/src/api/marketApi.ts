import {http} from './client';
import type {Stock} from '../types/types';

export const marketApi = {
    initMarket: () => {
        http<void>('/market/init', {method: 'GET'})
    },
    startSimulation: () => http<void>('/market/simulate/start',{method: 'GET'}),
    stopSimulation: () => http<void>('/market/simulate/stop',{method: 'GET'}),
    buy: (id: String, quantity: number) => {
        const payload = {stockId: id, quantity: quantity};
        http<Stock>('/market/buy', {method: 'POST', body: JSON.stringify(payload)});
    },
    sell: (id: String, quantity: number) => {
        const payload = {stockId: id, quantity: quantity};
        http<Stock>('/market/sell', {method: 'POST', body: JSON.stringify(payload)});
    },
};