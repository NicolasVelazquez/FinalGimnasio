import mongoose from "mongoose"

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    memberId: mongoose.ObjectId,
    type: { type: String, enum: 
        ['diario', 'semanal', 'quincenal', 'mensual', 'semestral', 'anual'], 
        required: true },
    price: Number,
    start: String,
    end: String
}, {
    collection: 'payments'
});

paymentSchema.index({ memberId: 1 }, { unique: true })

const payments = mongoose.model('Payments', paymentSchema);

export default payments