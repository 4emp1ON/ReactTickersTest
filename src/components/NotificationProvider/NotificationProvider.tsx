import React, {Component} from 'react';
import {INotificationStatus, NotificationStore} from "./NotificationStore";
import {makeObservable, observable} from "mobx"
import {observer} from "mobx-react";

@observer
class NotificationProvider extends Component<{}> {

    @observable store = NotificationStore;

    constructor(props: {}) {
        super(props);
        makeObservable(this)
    }

    render() {
        return (
            <>
                <div className="fixed top-6 right-6 min-w-20 z-50">
                    {
                        this.store.notificationList.map(notification => (
                            <div
                                key={notification.id}
                                className={`w-full bg-opacity-80 p-4 mb-3 animate-slide-in
                        ${notification.status === INotificationStatus.NOTIFICATION_SUCCESS
                                    ? 'bg-green-200'
                                    : 'bg-red-200'}`}
                            >
                                <h3>{notification.title}</h3>
                                {notification.message ? <p>{notification.message}</p> : ''}
                            </div>
                        ))

                    }
                </div>
                {this.props.children}
            </>
        );
    }
}

export default NotificationProvider;
