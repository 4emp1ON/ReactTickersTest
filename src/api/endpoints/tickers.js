import { getInstance } from "../tools";

export function tickerListOne() {
    return getInstance().get('', { params: { command: 'returnTicker' } })
}

export function tickerListSecond() {
    return getInstance().get('', { params: { command: 'returnTicker' } })
}
