const { response } = require('express');
const express=require('express');//the module we are using is express
const port=8000;
const path=require('path');

const db=require("./config/mongoose");//require our db to fire
const Contact=require("./Model/contact"); //requiring our model
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//for parsing
app.use(express.static('assets'));//accessing static files

//creating our own middleware
// app.use(function(req,res,next){ //next passes on whatever changes have been done and call the next middleware,if there is next middleware otherwise it goes to the controller.
//     req.myName="Abhishek";
//   //  console.log('middleware 1 called');
//     next();//called next to pass to  next middleware or whatever is next in line.otherwise page will be loading only.
// });

//middleware2;-middleware can be use to manipulate req or response data.
// app.use(function(req,res,next){
//     console.log('my name from middleware2 is',req.myName);
//   //  console.log('middleware 2 called');
//     next();
// });

var contactList=[
    {
        name: "Abhishek",
        phone: "7000482884"
    },

    {
        name: "arpan",
        phone: "1234567890"
    },

    {
        name: "TOny Stark",
        phone: "2132435455"
    }
]

app.get('/',function(req,res){  // here callback fn is controller
    // console.log(req); //will be see all requests in the terminal through this
    // console.log(__dirname);// this will show the directroy from where index.js has startted
    // res.send('<h1>Cool it is running or it is???</h1>'); //automatically detects html, it is because of express framework. we are returning a response from server
  //  console.log('from the get route controller',req.myName);


    //fetching data from database.
    Contact.find({},function(err, contacts){ //first argument of find is empty because i want everything, if i want to find by name then i can write querry like name:"the name" here and only contact with this name will be displayed
        //function first argument is error and second one is all the contacts wich have been found
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list:contacts

        });
    });

   
   
    //sending response while we were using array but now we are using db so we will send response from db

    // return res.render('home',{
    //     title:"Contact List", //we are sending data -title from js file to html file.
    //     contact_list:contactList
    // });

});

app.get('/practice',function(req,res){ //controller
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){ //controller
    // return res.redirect('/practice');


    //after parsing you can see the req have name and phone in body

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    //push the data in our array contact list

    // contactList.push({
    //     Name:req.body.name,
    //     Phone:req.body.phone
    // });

    //i can also push like this:-
   
   
   // contactList.push(req.body); we were pushing it into variable when we were not using database

   Contact.create({
       name: req.body.name,    //pushing data into database
       phone: req.body.phone 
   },function(err,newContact){   //whenever we are creating something we need a callback function for checking error
        if(err){
            console.log("error in creating newContact");
            return;
        }
        console.log('*********',newContact);
        res.redirect('back');
   });

    

});


//app.get('/delete-contact/:Phone', function(req,res){ //after contact ------:phone is string parameter    using string para here
app.get('/delete-contact',function(req,res){   //using query para here
    // console.log(req.params);
    // let phone=req.params.phone  ---till we were using array

    //get the id from the querry in the ul
    let id=req.query.id;
    console.log(id);
    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from Database');
            return;
        }

        return res.redirect('back');
    });





    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);   ----------- till we were using array for storing the data
    // //findIndex returns -1 if no value is found
    // if(contactIndex!=-1){                      
    //     contactList.splice(contactIndex, 1); //here 1 segefies removal of 1 element
    // }
    // return res.redirect('back');


});



app.listen(port,function(err){
    if(err){ 
        console.log("Error in running the server!",err);
        return;
    }
    console.log('Yup! my Express Server is running on port:',port);
});