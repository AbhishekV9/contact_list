const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({  //created our schema for document
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

const Contact=mongoose.model('Contact',contactSchema); //the name we want to give to our colection. in parenthesis we have written contact
//because that is the name we want to give to our collection and it is defined by schema calles contactSchema.

module.exports = Contact;
//model is collection just like our contactList array in index.js is collection