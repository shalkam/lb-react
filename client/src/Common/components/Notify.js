import React from 'react';
import NotificationSystem from 'react-notification-system';
import PubSub from 'pubsub-js';

export default class Notify extends React.Component {
    _addNotification(msg, data) {
        this.refs.notificationSystem.addNotification(data);
    }
    _removeNotification(msg, uid) {
        this.refs.notificationSystem.removeNotification(uid);
    }
    componentDidMount() {
        PubSub.subscribe("NOTIFY", this._addNotification.bind(this));
        PubSub.subscribe("NOTIFY_REMOVE", this._removeNotification.bind(this));
    }
    render() {
        return (
            <div>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}
