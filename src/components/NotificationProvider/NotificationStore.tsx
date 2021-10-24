import {action, computed, makeObservable, observable} from "mobx";
// @ts-ignore
import {v4} from 'uuid';


export enum INotificationStatus {
    NOTIFICATION_SUCCESS = 'success',
    NOTIFICATION_ERROR = 'error'
}

interface INotificationDto {
    title: string,
    message?: string
}

export interface INotificationItem extends INotificationDto {
    id: string,
    status: INotificationStatus,
}

export class _NotificationStore {

    @observable
    notificationList: INotificationItem[] = []

    constructor() {
        makeObservable(this)
    }

    @computed
    get nextNotification() {
        if (!this.notificationList.length) {
            return false
        }
        return this.notificationList[0]
    }

    @action
    addSuccess(notification: INotificationDto) {
        const notificationItem: INotificationItem =
            {
                id: v4(),
                status: INotificationStatus.NOTIFICATION_SUCCESS,
                title: notification.title,
                message: notification.message,
            }
        this.notificationList.push(notificationItem)
        this.hideWTimeout(notificationItem)
    }

    @action
    addError(notification: INotificationDto) {
        const notificationItem: INotificationItem =
            {
                id: v4(),
                status: INotificationStatus.NOTIFICATION_ERROR,
                title: notification.title,
                message: notification.message,
            }
        this.notificationList.push(notificationItem)
        this.hideWTimeout(notificationItem)
    }

    @action
    private hideWTimeout(notification: INotificationItem) {
        setTimeout(() => {
            this.drop(notification)
        }, 5000)
    }

    @action
    drop(notification: INotificationItem) {
        const idx = this.notificationList.findIndex((notify) => notify.id === notification.id);
        if (idx >= 0) {
            this.notificationList.splice(idx, 1);
        }
    }
}

export const NotificationStore = new _NotificationStore()

