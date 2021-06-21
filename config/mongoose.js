const mongoose=require("mongoose");//require the library


mongoose.connect("mongodb://localhost/contact_List_DB");//this is how our mongoose will connect to our database

const db=mongoose.connection;//the connection between mongoose and database is in our variable db.(aquiring the connection).

db.on('error',console.error.bind(console,"error connecting to db")); 
//console.error prints error in console,the message we want to bind to console is "error  connecting to db"

db.once('open',function(){ //once is defined function in db and this line means once our connection is opened to interact with 
//data base then call function
console.log("coonection succesfull established with database")

});