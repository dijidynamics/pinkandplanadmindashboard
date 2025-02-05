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
});

// Create the model once
const VendorCollModel = mongoose.model('vendorlistmy1', vendorSchema);

// Define the schema for the events collection
const eventsSchema = new mongoose.Schema({
    vendoremail: { type: String, required: true },
    serviceddetails: { type: String, required: true },
    serviceprice: { type: String, required: true },
    notes: { type: String, required: true },
    serviceimage: { type: String, required: true }, // Add this line   
    totallikes: { type: String, required: true },
    categoryid: { type: String, required: true }, // Add this line  
});


// Create the model once
const EventsCollModel = mongoose.model('eventdetails', eventsSchema);


const customerUserListSchema = new mongoose.Schema({
  customeruseremail: { type: String, required: true, unique: true },
  customerusername: { type: String, required: true },
  customeruserpassword: { type: String, required: true }, // Hash this in production
  status: { type: String, required: true }, // Can be "active", "inactive", etc.
  createdAt: { type: Date, default: Date.now,  required: true},
  updatedAt: { type: Date, default: Date.now, required: true},
})

const CustomerUserModel = mongoose.model("customeruserlists", customerUserListSchema);

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

{/* 
mongoose.connection.on('connected', async () => {
    console.log('Mongoose is connected to the database.');

  
    const count = await CustomerUserModel.countDocuments();
    if (count === 0) {
        console.log('No data found, inserting test data...');
        

        await CustomerUserModel.insertMany([
            {
                customeruseremail: "test@example.com",
                customerusername: "Test User",
                customeruserpassword: "hashedpassword123", 
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                customeruseremail: "user2@example.com",
                customerusername: "User Two",
                customeruserpassword: "hashedpassword456",
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);

        console.log('Test data inserted successfully.');
    }
});
*/}

const app = express();
app.use(cors());
app.use(express.json());



// Route to insert data into a new collection
app.post("/addownevent", (req, res) => {
 
    const { vendoremail } = req.body;
    const { serviceddetails } = req.body;
    const { serviceprice } = req.body;
    const { notes } = req.body;
    const { serviceimage } = req.body;
    const { totallikes } = req.body;
    const { categoryid } = req.body;

        // Create a new model for a new collection dynamically
        const EventsCollectionModel = mongoose.model('eventdetails', mongoose.Schema({
            vendoremail: { type: String, required: true },
            serviceddetails: { type: String, required: true },
            serviceprice: { type: String, required: true },
            notes: { type: String, required: true },
            serviceimage: { type: String, required: true },
            totallikes: { type: String, required: true },
            categoryid: { type: String, required: true }
        }));


        const newEvents = new EventsCollectionModel({
            vendoremail: vendoremail,
            serviceddetails: serviceddetails,
            serviceprice: serviceprice,
            notes: notes,
            serviceimage: serviceimage,
            totallikes: totallikes,
            categoryid: categoryid,
        });
 

        newEvents.save()
        .then(Events => {
            res.status(201).json({ message: 'Vendor added to new collection successfully', Events });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });

})



// Define the GET route to fetch Events data
app.get('/getevents', async (req, res) => {
    try {
        const events = await EventsCollModel.find();
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
});







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
        vendorssmno: { type: String, required: true }
        
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
    const { vendoremail, vendorname, vendorpassword, vendorphone, vendorssmno } = req.body;


    const newVendor = new VendorCollectionModel({
        vendoremail,
        vendorname,
        vendorphone,
        vendorpassword,
        vendorssmno      
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

// Define the GET route to fetch vendor data
app.get('/customeruserlist', async (req, res) => {
    try {
      const customerUserList = await CustomerUserModel.find();
      console.log("Fetched Data:", customerUserList); // Debugging log
      res.json(customerUserList);
    } catch (err) {
      console.error('Error fetching customer test users:', err);
      res.status(500).json({ message: 'Error fetching Customers', error: err });
    }
  });
  
  // Define the Add new Customer emailid

  app.post('/addcustomer', async (req, res) => {
    const { customeruseremail, customerusername, customeruserpassword, status, createdAt, updatedAt } = req.body;
  
    try {
      // Optional: Hash the password before saving (use bcrypt or any hashing algorithm)
      // const hashedPassword = bcrypt.hashSync(customeruserpassword, 10);
      
      const newCustomer = new CustomerUserModel({
        customeruseremail,
        customerusername,
        customeruserpassword,  // Replace with hashedPassword if you hash it
        status,
        createdAt,
        updatedAt,
      });
  
      await newCustomer.save();
      res.status(201).json({ message: 'Customer signed up successfully', customer: newCustomer });
    } catch (error) {
      console.error('Error signing up customer:', error);
      res.status(500).json({ message: 'Error signing up customer', error });
    }
  });
  

  app.post("/customersignup", async (req, res) => {
    try {
      const { customeruseremail, customerusername, customeruserpassword, status, createdAt, updatedAt } = req.body;
      
      const newCustomerUser = new CustomerUserModel({
        customeruseremail,
        customerusername,
        customeruserpassword,
        status,
        createdAt: new Date(createdAt), // Convert string to Date object
        updatedAt: new Date(updatedAt), // Convert string to Date object
      });
  
      await newCustomerUser.save();
      res.status(201).json({ message: 'Customer created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating customer', error: err });
    }
  });
  


// Define the schema for the vendor collection
const categorySchema = new mongoose.Schema({
    categoryid: { type: String, required: true },
    categoryname: { type: String, required: true },
    image: { type: String, required: true }  // Add this line
}, { strict: false });

// Create the model once
const CategoryCollModel = mongoose.model('pandpcategorylist', categorySchema, 'pandpcategorylist');



// Define the GET route to fetch vendor data
app.get('/categorylist', async (req, res) => {
    try {
        const categorylist = await CategoryCollModel.find();
        res.json(categorylist)
    } catch (err)
    {
        console.err('error fetching error', err);
        res.status(500).json({message: 'Error fetching vendors',  error: err})
    }
})


// Start the server
app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
