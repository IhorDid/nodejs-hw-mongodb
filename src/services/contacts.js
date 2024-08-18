import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = await ContactsCollection.find();
  // const contactsCount = await ContactsCollection.find()
  //   .merge(contactsQuery)
  //   .countDocuments();
  const contactsCount = await ContactsCollection.countDocuments().exec();
  // const contacts = await ContactsCollection.find()
  //   .merge(contactsQuery)
  //   .skip(skip)
  //   .limit(limit)
  //   .exec();
  const contacts = await ContactsCollection.find()
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
