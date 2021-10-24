import {action, makeObservable, observable} from "mobx";
import {ITickerItem, ITickersTab} from "../types/Tickers";
import {api} from "../api/Api";
import {notificationStore} from "./NotificationStore";

class _TickersStore {
    @observable tickersList?: ITickerItem[]
    @observable isLoading = true

    constructor() {
        makeObservable(this)
    }

    private _apiMap = {
        [ITickersTab.TAB_A]: api.getTickerA(),
        [ITickersTab.TAB_B]: api.getTickerB()
    }

    @action
    fetchTickers = async (tickerTab: ITickersTab) => {
        console.log('tickerTab', tickerTab)
        try {
            this.setLoading(true)
            const list = await this._apiMap[tickerTab]
            this.setTickersList(list);
            console.log('list', list);
            notificationStore.addSuccess({title: 'Успешно обновлено'})
        } catch (e) {
            notificationStore.addError({title: 'Ошибка загрузки'})
            throw e
        } finally {
            this.setLoading(false)
        }
    }

    @action
    setTickersList = (list: ITickerItem[]) => {
        this.tickersList = list
    }

    @action
    clearTickersList = () => {
        this.tickersList = []
    }

    @action
    setLoading = (value: boolean) => {
        this.isLoading = value
    }
}

export const tickersStore = new _TickersStore()
