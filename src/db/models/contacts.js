import { Schema, model } from 'mongoose';

const constactsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      require: true,
      default: 'personal',
    },

    userId: { type: Schema.Types.ObjectId, required: true },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactsCollection = model('contacts', constactsSchema);
export { ContactsCollection };
