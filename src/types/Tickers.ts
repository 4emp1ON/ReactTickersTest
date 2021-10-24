import {ITickerItemDTO} from "../api/Api";

export interface ITickerDTO {
    [key: string]: ITickerItemDTO
}

export interface ITickerItem {
    id: number,
    name: string,
    last: string,
    highestBid: string,
    percentChange: string
}

export enum ITickersTab {
    TAB_A = 'tickersA',
    TAB_B = 'tickersB'
}
