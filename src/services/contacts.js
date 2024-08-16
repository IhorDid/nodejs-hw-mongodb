import { ContactsCollection } from '../db/models/contacts.js';

const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
const upsertContact = async (contactId, payload) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );
};
const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export {
  getAllContacts,
  getContactsById,
  createContact,
  upsertContact,
  deleteContact,
};
