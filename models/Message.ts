import { Schema, model, Document, Model, models } from 'mongoose';


interface IMessage {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  yacht: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
}

interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  yacht: {
    type: Schema.Types.ObjectId,
    ref: 'Yacht',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
  },
  body: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});


const Message: Model<IMessageDocument> = models.Message || model<IMessageDocument>('Message', MessageSchema);

export default Message;
