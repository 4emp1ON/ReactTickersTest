import React, {Component} from 'react';
import {ITickerItem} from "../types/Tickers";
import {observer} from "mobx-react";


@observer
class TickerItem extends Component<ITickerItem> {
    render() {
        return (
            <tr key={this.props.id}>
                <td>{this.props.name}</td>
                <td>{this.props.last}</td>
                <td>{this.props.highestBid}</td>
                <td>{this.props.percentChange + '%'}</td>
            </tr>
        );
    }
}

export default TickerItem;
