import React, { useState, useEffect } from "react";
import axios from "axios";

function AddServices() {
    const [vendors, setVendors] = useState([]); // List of vendors
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState({});
    const [newService, setNewService] = useState({
        serviceuser_id: "",
        servicenameofuser: "",
        servicetitle: "",
        servicedescription: "",
        servicepricelist: "",
        serviceimage: [], // Store images as an array
    });

    // Fetch all users and filter vendors
    useEffect(() => {
        axios.get("http://147.93.96.202:4001/dbuserlist")
            .then((res) => {
                const vendorList = res.data.filter(user => user.role === "vendor");
                setVendors(vendorList);
            })
            .catch((err) => console.error("Error fetching vendors:", err));
    }, []);

    useEffect(() => {
        axios.get("http://147.93.96.202:4001/getservicelist/")
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

    const handleVendorChange = (e) => {
        const selectedVendor = vendors.find(vendor => vendor._id === e.target.value);
        if (selectedVendor) {
            setNewService(prevService => ({
                ...prevService,
                serviceuser_id: selectedVendor._id,
                servicenameofuser: selectedVendor.nameofuser,
            }));
        }
    };

    const handleImageClick = (serviceId, img) => {
        setSelectedImages((prev) => ({
          ...prev,
          [serviceId]: img, // Store selected image per service ID
        }));
      };


    // Handle Service Image Upload
    const handleImageChange = (e) => {
        if (e.target.files.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }
        setNewService((prevService) => ({
            ...prevService,
            serviceimage: Array.from(e.target.files),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("serviceuser_id", newService.serviceuser_id);
        formData.append("servicenameofuser", newService.servicenameofuser);
        formData.append("servicetitle", newService.servicetitle);
        formData.append("servicedescription", newService.servicedescription);
        formData.append("servicepricelist", newService.servicepricelist);

        if (Array.isArray(newService.serviceimage)) {
            newService.serviceimage.forEach((file) => {
                formData.append("serviceimage", file);
            });
        } else {
            console.error("No valid images selected.");
        }

        try {
            const response = await axios.post("http://147.93.96.202:4001/addservice", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Service added:", response.data);
            alert("Service added successfully!");

             // ✅ Step 1: Update the UI without refreshing the page
        setServices((prevServices) => [...prevServices, response.data]);
  // ✅ Step 2: Reset form fields
  setNewService({
    serviceuser_id: "",
    servicenameofuser: "",
    servicetitle: "",
    servicedescription: "",
    servicepricelist: "",
    serviceimage: [],
});

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
                        onChange={handleSearch}
                        value={search}
                    />
                    <div className="row">
                    {filteredServices.map((service) => {
  const images = service.serviceimage;
  const selectedImage = selectedImages[service._id] || images[0]; // Default to first image

  return (
    <div key={service._id} className="col-md-4 mb-3">
      <div className="card p-2">
        <p className="fw-bold">{service.servicenameofuser}</p>

        {/* Main Image */}
        <img
          src={selectedImage}
          className="card-img-top"
          alt={service.servicenameofuser}
          style={{ height: "150px", objectFit: "cover", cursor: "pointer" }}
        />

        <div className="card-body">
          <h5 className="card-title">{service.servicetitle}</h5>
          <p className="card-text">{service.servicedescription}</p>
          <p className="fw-bold">Price: {service.servicepricelist}</p>

          {/* Show All Images Below */}
          <div className="d-flex justify-content-center mt-2">
            {images.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className={`border m-1 ${selectedImage === img ? "border-primary" : ""}`}
                style={{ width: "50px", height: "50px", cursor: "pointer", objectFit: "cover" }}
                onClick={() => handleImageClick(service._id, img)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
})}
                    </div>
                </div>

                {/* Add New Service Form */}
                <div className="col-md-4">
                    <h3>Add New Service</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Select Vendor</label>
                        <select className="form-control" onChange={handleVendorChange} required>
                            <option value="">Select Vendor</option>
                            {vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor._id}>{vendor.nameofuser}</option>
                            ))}
                        </select>
                        {/* Other Input Fields */}
                        <div style={{ marginBottom: '5px' }}>
  <input 
    type="text" 
    className="form-control" 
    placeholder="Service Title" 
    name="servicetitle" 
    value={newService.servicetitle} 
    onChange={handleChange} 
    required 
  />
</div>

<div style={{ marginBottom: '5px' }}>
  <textarea 
    type="text" 
    className="form-control" 
    placeholder="Description" 
    style={{ height: '140px', textAlign: 'left', overflow: 'auto' }}  
    name="servicedescription" 
    value={newService.servicedescription} 
    onChange={handleChange} 
    required 
    rows="4"
  />
</div>

<div style={{ marginBottom: '5px' }}>
  <input 
    type="text" 
    className="form-control" 
    placeholder="Price" 
    name="servicepricelist" 
    value={newService.servicepricelist} 
    onChange={handleChange} 
    required 
  />
</div>


                        <input type="file" className="form-control mt-2" multiple accept="image/*" onChange={handleImageChange} required />
                        <button type="submit" className="btn btn-primary mt-3">Add Service</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddServices;
