import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToLocalMachine } from '../utils/saveFileToLocalMachine.js';

const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find({ userId });

  const contactsCount = await ContactsCollection.countDocuments({
    userId,
  }).exec();

  const contacts = await ContactsCollection.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  contactsQuery.where('userId').equals(userId);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

const getContactsById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};
const createContact = async ({ photo, ...payload }, userId) => {
  const url = await saveFileToLocalMachine(photo);

  const contact = await ContactsCollection.create({
    ...payload,
    userId,
    photo: url,
  });
  return contact;
};
const upsertContact = async (contactId, { photo, ...payload }, userId) => {
  

  let updateContact = { ...payload };

  if (photo) {
    const url = await saveFileToLocalMachine(photo);
    updateContact.photo = url;
  }

  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updateContact,
    { new: true },
  );
};
const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
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
