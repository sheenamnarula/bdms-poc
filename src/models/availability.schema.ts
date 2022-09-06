import * as mongoose from 'mongoose';

export const AvailabilitySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    doctorId: { type: String, required: true },
    slotId: { type: String, required: true },
    date: { type: String, required: true },
    blocked: { type: Boolean, required: true }
});
