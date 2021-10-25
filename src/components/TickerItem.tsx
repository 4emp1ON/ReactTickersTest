import React, {Component} from 'react';
import {ITickerItem} from "../types/Tickers";
import {observer} from "mobx-react";

interface ITickerItemViewProps {
    handleClick: (ticker: ITickerItem) => React.MouseEvent
    ticker: ITickerItem
}

@observer
class TickerItem extends Component<ITickerItemViewProps> {
    render() {
        return (
            <tr className="cursor-pointer" onClick={() => this.props.handleClick(this.props.ticker)} key={this.props.ticker.id}>
                <td>{this.props.ticker.name}</td>
                <td>{this.props.ticker.last}</td>
                <td>{this.props.ticker.highestBid}</td>
                <td>{this.props.ticker.percentChange + '%'}</td>
            </tr>
        );
    }
}

export default TickerItem;
