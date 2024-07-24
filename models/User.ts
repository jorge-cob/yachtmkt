import { Schema, model, models, Document } from 'mongoose';

interface User extends Document {
  email: string;
  username: string;
  image?: string;
  bookmarks?: Array<string>;
}

const UserSchema: Schema<User> = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  image: {
    type: String
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Yacht'
    }
  ]
}, {
  timestamps: true
});

const User = models.User || model<User>('User', UserSchema);

export default User;