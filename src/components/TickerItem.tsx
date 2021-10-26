import React, {Component} from 'react';
import {ITickerItem} from "../types/Tickers";
import {observer} from "mobx-react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {computed} from "mobx";

interface ITickerItemViewProps {
    handleClick: (ticker: ITickerItem) => React.MouseEvent
    ticker: ITickerItem
}

@observer
class TickerItem extends Component<ITickerItemViewProps> {

    @computed
    get listView() {
        const {id, ...fields} = this.props.ticker
        return fields
    }

    render() {
        return (
            <tr
                className="cursor-pointer"
                onClick={() => this.props.handleClick(this.props.ticker)}
                key={this.props.ticker.id}
            >
                {Object.entries(this.listView).map(pair => {
                    const [key, value] = pair
                    return (
                        <SwitchTransition key={`${value}_${key}`} mode='out-in'>
                            <CSSTransition
                                key={`${key}_${value}`}
                                timeout={300}
                                classNames="fade"
                            >
                                <td>{value}</td>
                            </CSSTransition>
                        </SwitchTransition>
                    )
                })}
            </tr>
        );
    }
}

export default TickerItem;
