const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//image upload file
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

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



// Define storage for uploaded images
// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Set up static folder to serve files from the 'uploads' directory
const upload = multer({ storage });


//api to upload addservice 
app.post("/addservice", upload.array("serviceimage", 3), async (req, res) => {
    try {
        const { serviceuser_id, servicenameofuser, servicetitle, servicedescription, servicepricelist } = req.body;

        if (!serviceuser_id || !servicenameofuser || !servicetitle || !servicedescription || !servicepricelist) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Construct image URLs
        const serviceimage = req.files.map(file => `http://147.93.96.202:4001/uploads/${file.filename}`);

        const newService = new DBserviceCollModel({
            serviceuser_id,
            servicenameofuser,
            servicetitle,
            servicedescription,
            servicepricelist,
            serviceimage,
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// API to Create or Update Category with Image Upload
app.post('/categorylist', upload.single('image'), async (req, res) => {
    try {
        const { categoryid, categoryname } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
        // Check if the category already exists
        let category = await CategoryCollModel.findOne({ categoryid });
        if (category) {
            // Update existing category
            category.categoryname = categoryname;
            if (req.file) category.image = imagePath;
            await category.save();
            return res.status(200).json({ message: 'Category updated', category });
        } else {
            // Create new category
            const newCategory = new CategoryCollModel({ categoryid, categoryname, image: imagePath });
            await newCategory.save();
            return res.status(201).json({ message: 'Category created', category: newCategory });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error saving category' });
    }
});


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


// Define the schema for the user collection
const dbuserlistSchema = new mongoose.Schema({
    dbusername: { type: String, required: true },
    dbpassword: { type: String, required: true },
    dbstatus: { type: String, required: true },
    nameofuser: { type: String, required: true },
    role: { type: String, required: true },
    ssm: { 
        type: String,
        required: function() { return this.role === "vendor"; }  // Required only for vendors
    }
});

//define the schema for the service collection
const dbservieSchema = new mongoose.Schema({
    serviceuser_id: { type: String, required: true },
    servicenameofuser: { type: String, required: true },
    servicetitle: { type: String, required: true },
    servicedescription: { type: String, required: true },
    servicepricelist: { type: String, required: true },
    serviceimage: { type: [String], required: true }, // Array of image URLs
});

// Create the user model once for service
const DBserviceCollModel = mongoose.model('serviceslist', dbservieSchema, 'serviceslist');


// Add a New Service - Using `app.post()`
app.post("/addservice", async (req, res) => {
    try {
      const { serviceuser_id, servicenameofuser, servicetitle, servicedescription, servicepricelist, serviceimage } = req.body;
  
      if (!serviceuser_id || !servicenameofuser || !servicetitle || !servicedescription || !servicepricelist || !serviceimage) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newService = new DBserviceCollModel({
        serviceuser_id,
        servicenameofuser,
        servicetitle,
        servicedescription,
        servicepricelist,
        serviceimage: Array.isArray(serviceimage) ? serviceimage : serviceimage.split(","), // Convert string to array if needed
      });
  
      await newService.save();
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

// Define the GET route to fetch user data
app.get('/getservicelist', async (req, res) => {
    try {
        const dbservicelist = await DBserviceCollModel.find();
        res.json(dbservicelist)
    } catch (err)
    {
        console.err('error fetching error', err);
        res.status(500).json({message: 'Error fetching vendors',  error: err})
    }
})





// Create the user model once
const DBuserCollModel = mongoose.model('userlist', dbuserlistSchema, 'userlist');



// Define the GET route to fetch user data
app.get('/dbuserlist', async (req, res) => {
    try {
        const dbuserlist = await DBuserCollModel.find();
        res.json(dbuserlist)
    } catch (err)
    {
        console.err('error fetching error', err);
        res.status(500).json({message: 'Error fetching vendors',  error: err})
    }
})

// Define the GET route to fetch only vendors
app.get('/dbuserlist', async (req, res) => {
    try {
        const vendors = await DBuserCollModel.find({ role: "vendor" }).select("_id nameofuser");
        res.json(vendors);
    } catch (err) {
        console.error('Error fetching vendors:', err);
        res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
});

// **POST API - Create a new user**
app.post('/pdbuserlist', async (req, res) => {
    try {
        const { dbusername, dbpassword, dbstatus, role, ssm, nameofuser } = req.body;

        // Basic validation
        if (!dbusername || !dbpassword || !dbstatus || !role || !nameofuser) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // If role is "vendor", ensure SSM is provided
        if (role === "vendor" && !ssm) {
            return res.status(400).json({ message: "SSM is required for vendors" });
        }

        // Create new user
        const newUser = new DBuserCollModel({
            dbusername,
            dbpassword,
            dbstatus,
            nameofuser,
            role,
            ssm: role === "vendor" ? ssm : "" // Store SSM only for vendors
        });

        // Save to database
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: 'Error creating user', error: err });
    }
});


//update user details
app.put('/updateuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { dbusername, dbpassword, dbstatus, role, ssm, nameofuser } = req.body;

        if (!dbusername || !dbpassword || !dbstatus || !role || !nameofuser) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Ensure SSM is provided if the user is a vendor
        if (role === "vendor" && !ssm) {
            return res.status(400).json({ message: "SSM is required for vendors" });
        }

        // Update the user in the database
        const updatedUser = await DBuserCollModel.findByIdAndUpdate(
            id,
            { dbusername, dbpassword, dbstatus, role, nameofuser, ssm: role === "vendor" ? ssm : "" },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user', error: err });
    }
});



// Login Route (without JWT)
app.post('/dbuser', async (req, res) => {
    const { dbusername, dbpassword } = req.body;

    try {
        const user = await DBuserCollModel.findOne({ dbusername });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password matches
        if (user.dbpassword !== dbpassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

         // Log the role value to check it's being fetched
       console.log('User role:', user.role); // <-- This will show the role in your server log
        // Return user details without JWT
        res.json({ message: "Login successful", dbusername: user.dbusername,   role: user.role });


    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});


// Start the server
app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
