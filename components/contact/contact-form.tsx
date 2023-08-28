import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';
//
async function sendContactData(contactDetails: ContactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
}

function ContactForm({}: Props) {
    // const [feedbackItems, setFeedbackItems] = useState<any[]>([]);
    const [requestStatus, setRequestStatus] = useState<string | null>(null); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState<string | null>(null); // 'error'
    const nameInputRef: RefObject<HTMLInputElement> = useRef(null);
    const emailInputRef: RefObject<HTMLInputElement> = useRef(null);
    const messageInputRef: RefObject<HTMLTextAreaElement> = useRef(null);

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredEmail = emailInputRef?.current?.value;
        const enteredName = nameInputRef?.current?.value;
        const enteredMessage = messageInputRef?.current?.value;

        const contactDetails: ContactDetails = {
            email: String(enteredEmail),
            name: String(enteredName),
            message: String(enteredMessage),
        };

        setRequestStatus('pending');

        try {
            await sendContactData(contactDetails);
            setRequestStatus('success');
            if (nameInputRef.current) {
                nameInputRef.current.value = '';
            }
            if (emailInputRef.current) {
                emailInputRef.current.value = '';
            }
            if (messageInputRef.current) {
                messageInputRef.current.value = '';
            }
        } catch (error) {
            if (error instanceof Error) {
                setRequestError(error.message);
            } else {
                setRequestError('An error occurred.');
            }
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            ref={emailInputRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            ref={nameInputRef}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows={5}
                        required
                        ref={messageInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}

export default ContactForm;

//############# Type ################
type Props = {};

interface ContactDetails {
    name: string;
    email: string;
    message: string;
}
