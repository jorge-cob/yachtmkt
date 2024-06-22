import { Schema, model, models } from 'mongoose';

const BikeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  description: {
    type: String
  },
  location: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  weight: {
    type: Number
  },
  size: {
    type: Number,
    required: [true, 'Size is required']
  },
  color: {
    type: String
  },
  components: [
    {
      type: String
    }
  ],
  gears: {
    front: {
      type: Number
    },
    rear: {
      type: Number
    }
  },
  seller_info: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  images: [
    {
      type: String
    }
  ],
  is_featured: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

const Bike = models.Bike || model('Bike', BikeSchema);

export default Bike;
