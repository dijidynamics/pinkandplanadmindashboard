const mongoose = require('mongoose')

const VendorlistSchema = new mongoose.Schema({
    vendoremail: {
        type: String,
        require: true
    }
})

const VendorlistModel = mongoose.modelNames("vendorslist",  VendorlistSchema)
module.exports = VendorlistModel;