import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export { Booking };
