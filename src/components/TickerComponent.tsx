import React, {Component} from 'react';
import {observer} from "mobx-react";
import {action, computed, makeObservable, observable} from "mobx";
import api from "../api"
import {NotificationStore} from "./NotificationProvider/NotificationStore";
import axios from "axios";


interface ITickerComponentProps {
    isActive: boolean,
    api: string,
    name: string
}

interface ITickerItem {
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

export interface ITickerList {
    [key: string]: ITickerItem
}

@observer
class TickerComponent extends Component<ITickerComponentProps> {
    name = ''
    api = ''
    @observable isLoading: boolean = false
    @observable _tickers: {} | undefined | ITickerList = {}
    interval: undefined | ReturnType<typeof setInterval>

    constructor(props: ITickerComponentProps) {
        super(props);
        this.name = props.name
        this.api = props.api
        makeObservable(this)
    }

    componentDidMount() {
        this.interval = setInterval(this.fetchTickers, 5000)
        this.fetchTickers();
    }

    componentWillUnmount() {
        // @ts-ignore
        clearInterval(this.interval)
    }

    @action
    setLoading(status: boolean) {
        this.isLoading = status
    }

    @computed
    get tickersList() {
        const tickers = []
        // @ts-ignore
        for (const [key, value] of Object.entries(this._tickers)) {
            tickers.push({
                id: value.id,
                name: key,
                last: value.last,
                highestBid: value.highestBid,
                percentChange: value.percentChange
            })
        }
        return this.api === 'tickerListOne' ? tickers.slice(0, tickers.length / 2) : tickers.slice(tickers.length / 2);
    }

    @action
    fetchTickers = async () => {
        try {
            this.setLoading(true)
            // @ts-ignore
            const resData = await api.tickers[this.api]()
            this.setTickers(resData)
            NotificationStore.addSuccess({title: 'Обновлено успешно'})
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.dir(e)
                NotificationStore.addError({title: 'Произошла ошибка', message: e.message})
            }
        } finally {
            this.setLoading(false)
        }
    }

    @action
    setTickers(tickers: ITickerList) {
        this._tickers = tickers
    }

    render() {
        return (
            <div className="relative">
                {this.isLoading ? (
                    <div className="bg-gray-400 bg-opacity-50 w-full h-full fixed top-1/2 left-1/2 transform translate-x-half translate-y-half flex justify-center items-center w-full">
                        <span className="flex items-center h-3 w-3 relative mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"/>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-700"/>
                        </span>
                        <span>Loading</span>
                    </div>
                ) : ''}
                <table className="w-full text-left rounded-2xl overflow-hidden">
                    <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Most recent bid</th>
                        <th>Highest bid</th>
                        <th>Percent change</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tickersList.map(ticker => {
                        return (

                            <tr key={ticker.id}>
                                <td>{ticker.name}</td>
                                <td>{ticker.last}</td>
                                <td>{ticker.highestBid}</td>
                                <td>{ticker.percentChange + '%'}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TickerComponent;
