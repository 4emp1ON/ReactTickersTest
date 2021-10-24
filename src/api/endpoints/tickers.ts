import {getInstance} from "../tools";
import {ITickerList} from "../../components/TickerComponent";

export function tickerListOne(): ITickerList {
    return getInstance().get('', {params: {command: 'returnTicker'}})
}

export function tickerListSecond(): ITickerList {
    return getInstance().get('', {params: {command: 'returnTicker'}})
}
