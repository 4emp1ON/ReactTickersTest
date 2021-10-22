import React, {Component} from 'react';
import {Link, Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {action, makeObservable, observable} from "mobx";
import {observer} from "mobx-react";
import TickerComponent from "../components/TickerComponent";


interface ITickersPageProps extends RouteComponentProps {
}

enum ITickersList {
    TICKERS_A = 'tickersA',
    TICKERS_B = 'tickersB'
}

@observer
class TickersPage extends Component<ITickersPageProps> {
    path = '';
    @observable activeLocation: null | ITickersList = null

    constructor(props: ITickersPageProps) {
        super(props);
        this.path = props.match.path
        makeObservable(this)
    }

    [ITickersList.TICKERS_A] = () => <TickerComponent isActive={this.isComponentActive(ITickersList.TICKERS_A)}
                                                      api={'tickerListOne'}
                                                      name={ITickersList.TICKERS_A}
    />;
    [ITickersList.TICKERS_B] = () => <TickerComponent isActive={this.isComponentActive(ITickersList.TICKERS_B)}
                                                      api={'tickerListSecond'}
                                                      name={ITickersList.TICKERS_B}
    />;

    componentDidMount() {
        this.setActiveLink()
    }

    onLinkClick = () => {
            this.setActiveLink()
    }

    @action
    setActiveLink = () => {
        process.nextTick(() => {
            const pathName = this.props.location.pathname.split('/')
            this.activeLocation = pathName[pathName.length - 1] === ITickersList.TICKERS_A ? ITickersList.TICKERS_A : ITickersList.TICKERS_B;
        })
    }

    isComponentActive(tickerName: ITickersList) {
        return this.activeLocation === tickerName
    }

    isTabActive(tickerName: ITickersList) {
        return this.isComponentActive(tickerName) ? 'bg-yellow-500' : ''
    }

    render() {
        return (
            <div className="py-3">
                <Link to="/">
                    <button
                        className="p-2 bg-blue-400 hover:bg-green-400 hover:text-white rounded-xl transition-colors mb-10">
                        Вернуться на главную
                    </button>
                </Link>

                <div className="bg-blue-400 rounded-2xl">
                    <div className="flex bg-yellow-200 rounded-xl">
                        <Link onClick={this.onLinkClick} to={`${this.path}/tickersA`}
                              className={`flex-grow bg-yellow-200 p-4 rounded-xl ${this.isTabActive(ITickersList.TICKERS_A)}`}
                        >
                            Котировки А</Link>
                        <Link onClick={this.onLinkClick} to={`${this.path}/tickersB`}
                              className={`flex-grow bg-yellow-200 p-4 rounded-xl transition-colors ${this.isTabActive(ITickersList.TICKERS_B)}`}
                        >Котировки Б
                        </Link>
                    </div>
                    <div className="p-4">
                        <Switch>
                            <Route path={`${this.path}/${ITickersList.TICKERS_A}`}
                                   component={this[ITickersList.TICKERS_A]}/>
                            <Route path={`${this.path}/${ITickersList.TICKERS_B}`}
                                   component={this[ITickersList.TICKERS_B]}/>
                            <Redirect from={this.path} to={`${this.path}/${ITickersList.TICKERS_A}`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default TickersPage;
