import {action, makeObservable, observable} from "mobx";
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

class _NotificationStore {

    @observable
    notificationList: INotificationItem[] = []

    constructor() {
        makeObservable(this)
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
        this.hideWithDelay(notificationItem)
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
        this.hideWithDelay(notificationItem)
    }

    @action
    private hideWithDelay(notification: INotificationItem) {
        setTimeout(() => {
            this.remove(notification)
        }, 5000)
    }

    @action
    remove(notification: INotificationItem) {
        const idx = this.notificationList.findIndex((notify) => notify.id === notification.id);
        if (idx >= 0) {
            this.notificationList.splice(idx, 1);
        }
    }
}

export const notificationStore = new _NotificationStore()

