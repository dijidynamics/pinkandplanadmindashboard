const mongoose = require('mongoose');

// Define the schema for the vendor collection
const vendorSchema = new mongoose.Schema({
    vendoremail: { type: String, required: true },
    vendorname: { type: String, required: true },
    vendorpassword: { type: String, required: true },
    vendorphone: { type: String, required: true },
    vendoraddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipcode: { type: String, required: true }
    }
});

// Create the model
const VendorCollModel = mongoose.model('vendorlistmy1', vendorSchema);
