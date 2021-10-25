import React, {Component} from 'react';
import {ITickerItem} from "../types/Tickers";
import {observer} from "mobx-react";

interface ITickerModalProps {
    ticker?: null | ITickerItem,
    hideModal: () => any
}

@observer
class TickerModal extends Component<ITickerModalProps> {

    handleButtonClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        this.props.hideModal()
    }

    render() {
        if (this.props.ticker) {
            return (
                <div onClick={this.props.hideModal}
                     className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-opacity-70 bg-gray-400 transition-opacity">
                    <div className="w-5/12 bg-white p-5 flex flex-col items-center">
                        <p className="mb-2">Name: <span className='font-semibold'>{this.props.ticker.name}</span></p>
                        <p className="mb-2">Last: <span className='font-semibold'>{this.props.ticker.last}</span></p>
                        <p className="mb-2">Highest bid: <span
                            className='font-semibold'>{this.props.ticker.highestBid}</span></p>
                        <p className="mb-4">Percent change: <span
                            className='font-semibold'>{this.props.ticker.percentChange}</span></p>
                        <button className="bg-blue-400 border rounded-md px-4 py-2"
                                onClick={this.handleButtonClick}>Close
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default TickerModal;
