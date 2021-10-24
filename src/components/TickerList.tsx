import React, {Component} from 'react';
import {ITickerItem} from "../types/Tickers";
import Loader from "./Loader";
import TickerItem from "./TickerItem";
import {observer} from "mobx-react";


interface ITickerListProps {
    tickerList?: ITickerItem[]
    isLoading: boolean
}

@observer
class TickerList extends Component<ITickerListProps> {

    render() {
        return (
            <div className="relative">
                {this.props.isLoading ? (
                    <Loader/>
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
                    {this.props.tickerList && this.props.tickerList.map(ticker => {
                        return (
                            <TickerItem key={ticker.id} {...ticker} />
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TickerList;
