import mongoose from "mongoose";

const ClientSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    // Avatar: {
    //     type: String
    // },
    MedicalHistory: {
        type: String,
        required: true
    },
    PaymentStatus: {
        type: String,
        required: true
    },
    ClientStatus: {
        type: String,
        required: true
    },
    DentalTypeServices: {
        type: String,
        required: true
    },
    Sex: {
        type: String,
        required: true
    },
    DateStart: {
        type: Date,
        required: true
    },
    DownPayment: {
        type: Number,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
});

const Client = mongoose.model('Clients', ClientSchema);

export default Client;