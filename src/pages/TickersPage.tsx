import React, {Component} from 'react';
import {Link, Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {action, makeObservable, observable, reaction, runInAction} from "mobx";
import {observer} from "mobx-react";
import TickerList from "../components/TickerList";
import {ITickersTab} from "../types/Tickers";
import {tickersStore} from "../stores/TickersStore";


interface ITickersPageProps extends RouteComponentProps {
}

@observer
class TickersPage extends Component<ITickersPageProps> {
    path = '';
    @observable activeTab?: ITickersTab
    @observable private _interval?: any

    constructor(props: ITickersPageProps) {
        super(props);
        makeObservable(this)
        this.path = props.match.path
        this.setActiveTab()

        reaction(() => this.activeTab, this.restartFetching)
    }

    [ITickersTab.TAB_A] = () => <TickerList tickerList={tickersStore.tickersList} isLoading={tickersStore.isLoading}/>;
    [ITickersTab.TAB_B] = () => <TickerList tickerList={tickersStore.tickersList} isLoading={tickersStore.isLoading}/>;

    componentWillUnmount() {
        this.stopFetching()
    }

    fetchTickers = async () => {
        console.log('fetching, active tab', this.activeTab)
        await tickersStore.fetchTickers(this.activeTab!);
    }

    @action
    startFetching = () => {
        this._interval = setInterval(this.fetchTickers, 5000)
    }

    @action
    stopFetching = () => {
        clearInterval(this._interval)
    }

    @action
    restartFetching = () => {
        console.log('restart')
        this.stopFetching()
        this.startFetching()
    }

    @action
    setActiveTab = () => {
        console.log('setActiveLink', this.path)
        process.nextTick(() => {
            const pathName = this.props.location.pathname.split('/')
            runInAction(() => {
                this.activeTab = pathName[pathName.length - 1] === ITickersTab.TAB_A ? ITickersTab.TAB_A : ITickersTab.TAB_B;
            })
            console.log('activeTab', this.activeTab)
        })
    }

    isComponentActive(tickerName: ITickersTab) {
        return this.activeTab === tickerName
    }

    isTabActive(tickerName: ITickersTab) {
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
                        <Link to={`${this.path}/${ITickersTab.TAB_A}`}
                              className={`flex-grow bg-yellow-200 p-4 rounded-xl ${this.isTabActive(ITickersTab.TAB_A)}`}
                        >
                            Котировки А</Link>
                        <Link to={`${this.path}/${ITickersTab.TAB_B}`}
                              className={`flex-grow bg-yellow-200 p-4 rounded-xl transition-colors ${this.isTabActive(ITickersTab.TAB_B)}`}
                        >Котировки Б
                        </Link>
                    </div>
                    <div className="p-4">
                        <Switch>
                            <Route path={`${this.path}/${ITickersTab.TAB_A}`}
                                   component={this[ITickersTab.TAB_A]}/>
                            <Route path={`${this.path}/${ITickersTab.TAB_B}`}
                                   component={this[ITickersTab.TAB_B]}/>
                            <Redirect from={this.path} to={`${this.path}/${ITickersTab.TAB_A}`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default TickersPage;
