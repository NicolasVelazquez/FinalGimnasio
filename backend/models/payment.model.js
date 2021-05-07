import mongoose from "mongoose"

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    type: { type: String, enum: 
        ['diario', 'semanal', 'quincenal', 'mensual', 'semestral', 'anual'], 
        required: true },
    start: Date,
    end: Date
}, {
    collection: 'payments'
});

const payments = mongoose.model('Payments', paymentSchema);

export default payments