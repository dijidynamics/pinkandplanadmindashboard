import React, { useState, useEffect } from "react";
import axios from "axios";

function AddServices() {
    const [vendors, setVendors] = useState([]); // List of vendors
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [newService, setNewService] = useState({
        serviceuser_id: "12345", // Static test ID
        servicenameofuser: "John's Catering", // Static test name
        servicetitle: "Wedding Catering Package",
        servicedescription: "A premium wedding catering service with 5-star chefs.",
        servicepricelist: "5000,10000,15000", // Example price list
        serviceimage: "image1.jpg,image2.jpg,image3.jpg", // Example image URLs
      });

  // Fetch all users and filter vendors
  useEffect(() => {
    axios.get("http://localhost:4001/dbuserlist")
      .then((res) => {
        const vendorList = res.data.filter(user => user.role === "vendor"); // Filter vendors
        setVendors(vendorList);
      })
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4001/getservicelist")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredServices = Array.isArray(services) 
  ? services.filter(service =>
      service.servicenameofuser?.toLowerCase().includes(search.toLowerCase())
    ) 
  : [];


  // Handle input changes
  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  // Handle vendor selection (update `serviceuser_id` automatically)
  const handleVendorChange = (e) => {
    const selectedVendor = vendors.find(vendor => vendor._id === e.target.value);
    setNewService((prevService) => ({
        ...prevService,
        serviceuser_id: selectedVendor._id,
        servicenameofuser: selectedVendor.nameofuser,
             }));
  };


    // Handle Service Title Change
    const handleServiceTitleChange = (e) => {
        setNewService((prevService) => ({
          ...prevService,
          servicetitle: e.target.value, // Update Service Title
        }));
      };
    
      // Handle Service Description Change
      const handleServiceDescriptionChange = (e) => {
        setNewService((prevService) => ({
          ...prevService,
          servicedescription: e.target.value, // Update Service Description
        }));
      };
    
      // Handle Service Price Change
      const handleServicePriceChange = (e) => {
        setNewService((prevService) => ({
          ...prevService,
          servicepricelist: e.target.value, // Update Service Price
        }));
      };

  // Submit new service
 //  const handleSubmit = (e) => {
 //    e.preventDefault();
 //    axios.post("http://localhost:4001/addservice", newService)
 //      .then((res) => {
  //       console.log("Service added:", res.data);
  //     })
//       .catch((err) => console.error("Error adding service:", err));
 //  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serviceuser_id", newService.serviceuser_id);
    formData.append("servicenameofuser", newService.servicenameofuser);
    formData.append("servicetitle", newService.servicetitle);
    formData.append("servicedescription", newService.servicedescription);
    formData.append("servicepricelist", newService.servicepricelist);

    newService.serviceimage.forEach((file) => {
        formData.append("serviceimage", file);
    });

    try {
        const response = await axios.post("http://147.93.96.202:4001/addservice", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Service added:", response.data);
        alert("Service added successfully!");
    } catch (err) {
        console.error("Error adding service:", err);
        alert("Something went wrong.");
    }
};



  return (
    <div className="container mt-4">
      <div className="row">
        {/* Services List */}
        <div className="col-md-8">
          <h3>All Services</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Vendor Name"
            value={search}
            onChange={handleSearch}
          />
          <div className="row">
            {filteredServices.map((service) => (
              <div key={service._id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={service.serviceimage[0]}
                    className="card-img-top"
                    alt={service.servicenameofuser}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.servicetitle}</h5>
                    <p className="card-text">{service.servicedescription}</p>
                    <p className="fw-bold">Price: {service.servicepricelist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Service Form */}
        <div className="col-md-4">
          <h3>Add New Service</h3>
          <form onSubmit={handleSubmit}>

{/* Vendor Selection Dropdown */}
<label>Select Vendor</label>
<select className="form-control" name="servicenameofuser" onChange={handleVendorChange} required>
  <option value="">Select Vendor</option>
  {vendors.map((vendor) => (
    <option key={vendor._id} value={vendor._id}>
      {vendor.nameofuser}
    </option>
  ))}
</select>

{/* Other Input Fields */}
<input type="text" className="form-control" placeholder="Service Title" name="servicetitle" value={newService.servicetitle} onChange={handleServiceTitleChange} required />
<input type="text" className="form-control" placeholder="Description" name="servicedescription" value={newService.servicedescription} onChange={handleServiceDescriptionChange} required />
<input type="text" className="form-control" placeholder="Price" name="servicepricelist" value={newService.servicepricelist} onChange={handleServicePriceChange} required />
<input 
    type="file" 
    className="form-control" 
    name="serviceimage" 
    multiple 
    accept="image/*" 
    onChange={(e) => {
        if (e.target.files.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }
        setNewService({ ...newService, serviceimage: Array.from(e.target.files) });
    }}
    required 
/>
{/* Submit Button */}
<button type="submit" className="btn btn-primary">Add Service</button>
</form>
        </div>
      </div>
    </div>
  );
}

export default AddServices;
