const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Define the schema for the vendor collection
const vendorSchema = new mongoose.Schema({
    vendoremail: { type: String, required: true },
    vendorname: { type: String, required: true },
    vendorpassword: { type: String, required: true },
    vendorphone: { type: String, required: true },
    vendorssmno: { type: String, required: true }, // Add this line
    vendoraddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipcode: { type: String, required: true }
    }
});

// Create the model once
const VendorCollModel = mongoose.model('vendorlistmy1', vendorSchema);

// Connect to MongoDB
const mongoURI = "mongodb+srv://dijidynamics2024:1Password**12345!@evmdb.8l73c.mongodb.net/pandp?retryWrites=true&w=majority&appName=evmdb";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to the database.');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected from the database.');
});

const app = express();
app.use(cors());
app.use(express.json());

// Route to insert data into a new collection
app.post("/addvendor", (req, res) => {
    const { vendoremail } = req.body;
    const { vendorname } = req.body;
    const { vendorpassword } = req.body;
    const { vendorphone } = req.body;
    const { vendoraddress } = req.body; 
    const { street, city, state, country, zipcode } = vendoraddress; 
    // Create a new model for a new collection dynamically
    const VendorCollectionModel = mongoose.model('vendorlistmy1', mongoose.Schema({
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
    }));

    const newVendor = new VendorCollectionModel({
        vendoremail: vendoremail,
        vendorname: vendorname,
        vendorphone: vendorphone,
        vendorpassword: vendorpassword,
        vendoraddress: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode
        }
    });

    newVendor.save()
        .then(vendor => {
            res.status(201).json({ message: 'Vendor added to new collection successfully', vendor });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

const VendorCollectionModel = mongoose.model('vendorlistmy1', vendorSchema);

// Route to insert data into the vendor collection
app.post("/addnewvendor", (req, res) => {
    const { vendoremail, vendorname, vendorpassword, vendorphone, vendoraddress, vendorssmno } = req.body;
    const { street, city, state, country, zipcode } = vendoraddress;

    const newVendor = new VendorCollectionModel({
        vendoremail,
        vendorname,
        vendorphone,
        vendorpassword,
        vendorssmno,
        vendoraddress: {
            street,
            city,
            state,
            country,
            zipcode
        }
    });

    newVendor.save()
        .then(vendor => {
            res.status(201).json({ message: 'Vendor added successfully', vendor });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});
// Define the GET route to fetch vendor data
app.get('/vendors', async (req, res) => {
    try {
        const vendors = await VendorCollModel.find();
        res.json(vendors);
    } catch (err) {
        console.error('Error fetching vendors:', err);
        res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
});

// Start the server
app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
