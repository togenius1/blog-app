import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './notification.module.css';

function Notification(props: Props) {
    const { title, message, status } = props;

    const [notificationsElement, setNotificationsElement] =
        useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.getElementById('notifications');
        setNotificationsElement(element);
    }, []);

    if (!notificationsElement) {
        return null;
    }

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    const cssClasses = `${classes.notification} ${statusClasses}`;

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>,
        notificationsElement
    );
}

export default Notification;

//################## Type ######################
type Props = {
    title: string;
    message: string | null;
    status: string;
};
