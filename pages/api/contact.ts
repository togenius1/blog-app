// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { insertContact } from '@/helpers/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CustomResponse>
) {
    // res.status(200).json({ name: 'John Doe' });
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({ errorMessage: 'Invalid input.' });
        }

        // Store in database
        const newMessage: newMessage = {
            email,
            name,
            message,
        };
        try {
            const result = await insertContact(newMessage);
            newMessage.id = result.id;
        } catch (error) {
            res.status(500).json({ errorMessage: 'Storing message failed!' });
            return;
        }

        res.status(201).json({
            message: 'Successfully stored message!',
            feedback: newMessage,
        });
    }
}

export default handler;

//############ Type #################
interface newMessage {
    email: string;
    name: string;
    message: string;
}

type FeedbackType = {
    email: string;
    name: string;
    message: string;
};

type SuccessResponse = {
    message: string;
    feedback: FeedbackType;
};

type ErrorResponse = {
    errorMessage: string;
};

type CustomResponse = SuccessResponse | ErrorResponse;
