import React, { useState, useEffect } from "react";
import axios from "axios";

function AddServices() {
    const [vendors, setVendors] = useState([]); // List of vendors
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({ id: "", name: "" });
    const [categories, setCategories] = useState([]);

    
    //states
    const [states, setStates] = useState([]); // Store state list
    const [selectedState, setSelectedState] = useState(""); // Track selected state
    const [districts, setDistricts] = useState([]); // Store filtered districts
    const [selectedDistrict, setSelectedDistrict] = useState(""); // Track selected district

    const [newService, setNewService] = useState({
        serviceuser_id: "",
        servicenameofuser: "",
        servicetitle: "",
        servicedescription: "",
        servicepricelist: "",
        serviceimage: [], // Store images as an array
        categoryid: "",  // Add category ID
        categoryname: "", // Add category name
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

      //categorylist

    // Fetch categories from API
    useEffect(() => {
        axios.get("http://147.93.96.202:4001/categorylist/")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

        // Handle category selection
        const handleCategoryChange = (e) => {
            const selected = categories.find(cat => cat._id === e.target.value);
            if (selected) {
                setSelectedCategory({ id: selected._id, name: selected.categoryname });
                setNewService(prev => ({
                    ...prev,
                    categoryid: selected._id,
                    categoryname: selected.categoryname,
                }));
            }
        };
        

    //locationlist
    useEffect(() => {
        // Fetch states and districts
        axios.get("http://localhost:4001/getlocationlist")
            .then(response => setStates(response.data)) // Store API data
            .catch(error => console.error("Error fetching locations:", error));

        // Fetch vendors (Example API call)
        axios.get("http://localhost:4001/getvendors")
            .then(response => setVendors(response.data))
            .catch(error => console.error("Error fetching vendors:", error));
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredServices = Array.isArray(services) 
        ? services.filter(service =>
            service.servicenameofuser?.toLowerCase().includes(search.toLowerCase())
        ) 
        : [];


    // Handle state selection
    const handleStateChange = (event) => {
        const stateId = event.target.value;
        setSelectedState(stateId);

        // Find the selected state's districts
        const stateData = states.find(state => state.stateid === stateId);
        setDistricts(stateData ? stateData.districts : []);
    };

    // Handle input changes
    const handleChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleVendorChange = (e) => {
        const selectedVendor = vendors.find(vendor => vendor._id === e.target.value);
        if (selectedVendor) {
            console.log("Selected Vendor:", selectedVendor);
            setNewService(prev => ({
                ...prev,
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

        // Add selected State and District to the formData
        formData.append("categoryid", selectedCategory.id);
        formData.append("categoryname", selectedCategory.name);
        formData.append("stateid", selectedState); // Send state
        formData.append("state", states.find(state => state.stateid === selectedState)?.state);
        formData.append("districtid", selectedDistrict); // Send district
        formData.append("district", districts.find(district => district.districtid === selectedDistrict)?.district);
    

        if (Array.isArray(newService.serviceimage)) {
            newService.serviceimage.forEach((file) => {
                formData.append("serviceimage", file);
            });
        } else {
            console.error("No valid images selected.");
        }


         // ✅ Debugging: Alert user before submitting
    alert(
        `Service Details:\n` +
        `User ID: ${newService.serviceuser_id}\n` +
        `Service Name: ${newService.servicenameofuser}\n` +
        `Title: ${newService.servicetitle}\n` +
        `Description: ${newService.servicedescription}\n` +
        `Price: ${newService.servicepricelist}\n` +
        `Category ID: ${selectedCategory.id}\n` +
        `Category Name: ${selectedCategory.name}\n` +
        `State ID: ${selectedState}\n` +
        `State Name: ${states.find(state => state.stateid === selectedState)?.state}\n` +
        `District ID: ${selectedDistrict}\n` +
        `District Name: ${districts.find(district => district.districtid === selectedDistrict)?.district}\n`
    );
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
setSelectedState(""); // Reset selected state
setDistricts([]); // Reset selected district

        } catch (err) {
            console.error("Error adding service:", err);
            alert("Something went wrong.");
        }
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
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
        <span className="fw-bold">{service.servicenameofuser}</span>
        <p style={{fontWeight:'normal', fontSize:'12px'}}>{service.categoryname}</p>
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
    {vendors.length > 0 ? (
        vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>{vendor.nameofuser}</option>
        ))
    ) : (
        <option disabled>Loading vendors...</option>
    )}
</select>
                       

{/* Other Input Fields */}
<div style={{ marginBottom: '5px' }}>
                        <label>Select Category</label>
        
                        <select className="form-control" onChange={handleCategoryChange} required>
    <option value="">Select Category</option>
    {categories.length > 0 ? (
        categories.map((category) => (
            <option key={category._id} value={category._id}>{category.categoryname}</option>
        ))
    ) : (
        <option disabled>Loading categories...</option>
    )}
</select>



            </div>
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
       {/* Select State */}
       <label className="mt-2">Select State</label>
                <select className="form-control" onChange={handleStateChange} required>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.stateid} value={state.stateid}>{state.state}</option>
                    ))}
                </select>

                {/* Select District (updates dynamically) */}
                <label className="mt-2">Select District</label>
                <select className="form-control" onChange={handleDistrictChange} required>
    <option value="">Select District</option>
    {districts.map((district) => (
        <option key={district.districtid} value={district.districtid}>{district.district}</option>
    ))}
</select>

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
