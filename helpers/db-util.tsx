import { DataStore } from 'aws-amplify';

import { Contact } from '@/src/models';

// Insert comments
export async function insertContact(
    newContact: ContactType
): Promise<ContactType> {
    const insertedContact = await DataStore.save(new Contact(newContact));

    return insertedContact;
}

//############ Type ###############
export type ContactType = {
    id: string;
    // eventId: string;
    email: string;
    name: string;
    message: string;
};
