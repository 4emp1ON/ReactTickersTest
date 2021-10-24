import axios from "axios";
import {ITickerDTO, ITickerItem, ITickersTab} from "../types/Tickers";

export interface ITickerItemDTO {
    "id": number,
    "last": string,
    "lowestAsk": string,
    "highestBid": string,
    "percentChange": string,
    "baseVolume": string,
    "quoteVolume": string,
    "isFrozen": string,
    "postOnly": string,
    "high24hr": string,
    "low24hr": string
}


class Api {
    private _axios = axios.create({baseURL: process.env.REACT_APP_API_URL || 'https://poloniex.com/public'})

    getTickerA = async () => {
        const res = await this._axios.get<ITickerDTO>('', {params: {command: 'returnTicker', tab: 'a'}})
        return this.normalize(res.data, ITickersTab.TAB_A)
    }

    getTickerB = async () => {
        const res = await this._axios.get<ITickerDTO>('', {params: {command: 'returnTicker', tab: 'b'}})
        return this.normalize(res.data, ITickersTab.TAB_B)
    }

    normalize(tickerListDTO: ITickerDTO, tickerTab: ITickersTab): ITickerItem[] {
        const tickers = []
        for (const [key, value] of Object.entries(tickerListDTO)) {
            tickers.push({
                id: value.id,
                name: key,
                last: value.last,
                highestBid: value.highestBid,
                percentChange: value.percentChange
            })
        }
        return tickerTab === ITickersTab.TAB_A ? tickers.slice(0, tickers.length / 2) : tickers.slice(tickers.length / 2)
    }
}

export const api = new Api();
