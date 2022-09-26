const mongoose = require('mongoose')

/*********************Created a Schema ************* */
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})
/**********Defining the what would be the collection name inside the DataBase as we have creates a collection name contactList in index.js */
const Contact = mongoose.model('Contact',contactSchema)

module.exports=Contact