import React, {Component} from 'react';
import {observer} from "mobx-react";
import {action, computed, makeObservable, observable} from "mobx";
import api from "../api"


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

interface ITickerList {
    [key: string]: ITickerItem
}

@observer
class TickerComponent extends Component<ITickerComponentProps> {
    name = ''
    api = ''
    @observable
    _tickers: null | undefined | ITickerList = {}
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
            // @ts-ignore
            this._tickers = await api.tickers[this.api]()
            console.log(this.tickersList)
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        // @ts-ignore
        return (
            <table className="w-full text-left rounded-2xl overflow-hidden">
                <tr>
                    <th>Pair</th>
                    <th>Most recent bid</th>
                    <th>Highest bid</th>
                    <th>Percent change</th>
                </tr>
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
            </table>
        );
    }
}

export default TickerComponent;
