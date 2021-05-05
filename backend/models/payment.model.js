// import mongoose from "mongoose"

// const Schema = mongoose.Schema;

// const paymentSchema = new Schema({
//   type: { type: String, enum: ['diario', 'semanal', 'quincenal', 'mensual', 'semestral', 'anual'], required: true },
// 	age: { type: Number, required: true },
//   genre: { type: String, required: false },
//   email: { type: String, required: true },
//   phonenumber: { type: String, required: false },
//   start: { type: Date, default: Date.now },
//   end: { type: Date, required: true }
// }, {
//   collection: 'members',
//   timestamps: true
// });

// paymentSchema.index({ email: 1, membername: 1 }, { unique: true })

// const member = mongoose.model('Member', memberSchema);

// export default member