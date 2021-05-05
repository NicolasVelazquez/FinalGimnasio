import mongoose from "mongoose"

const Schema = mongoose.Schema;

const payments = new Schema({ start: Date, end: Date });

const memberSchema = new Schema({
  membername: { type: String, required: true },
  age: { type: Number, required: true },
  genre: { type: String, required: false },
  email: { type: String, required: true },
  phonenumber: { type: String, required: false },
  birthday: { type: Date, required: false },
  classesEnrolled: [String],
  activePayment: payments
}, {
  collection: 'members',
  timestamps: true
});

memberSchema.index({ email: 1, membername: 1 }, { unique: true })

const member = mongoose.model('Member', memberSchema);

export default member