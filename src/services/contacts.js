import { ContactsCollection } from '../db/models/contacts.js';

const getAllContacts = async () => {
  const constacts = await ContactsCollection.find();
  return constacts;
};

const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export { getAllContacts, getContactsById };
