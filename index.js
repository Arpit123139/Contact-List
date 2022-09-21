const express=require('express')
const path=require('path')
const port=8000;

const app=express();

//Setting the value for the property view engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//Setting the parser
app.use(express.urlencoded())

//Middleware1
app.use(function(req,res,next){               // next make the changes and passes too the nexxt middleware 

    req.myName="Arpan"
    console.log(" Middleware 1 Called")
    next()              // The controll is pass sto the next middleware
}) 

// Middleware 2
app.use(function(req,res,next){               // next make the changes and passes too the nexxt middleware 

    console.log("My name from MW 2 ",req.myName)
    console.log(" Middleware 2  Called")
    next()              // The controll is pass sto the next middleware
}) 

var contactList=[

    {
        name:"Arpan",
        phone:"1111111111"
    }, 
    {
        name:"Tony Stark",
        phone:"1234567890"
    },
    {
        name:"Coding Ninja",
        phone:"64643145616"

    }
    
]

//Controller
app.get("/",function(req,res){
    console.log("From the get route controller ",req.myName)

    // passing the data from the server ro the browser 
    //this is a type of context that we are passing
    return res.render('home',{

        title: "Contact List",
        contact_list:contactList
    
    })
    //res.send("<h1>Cool.It Is running !!!!!!!!!!!!!!!!!!!!!!!</h1>")
})

// another controller for practice.ejs

app.get("/practice",function(req,res){

    return res.render('practice',{
        title:"Let Us play with ejs"
    })
})

// getting data from the form and pasing it and appending to the contact list 
app.post('/create-contact',function(req,res){

    //return res.redirect('/practice')
    console.log(req.body)
    console.log(req.body.my_name)
    console.log(req.body.my_phone)
    contactList.push({
        name:req.body.my_name,
        phone:req.body.my_phone
    })
    
    return res.redirect('/')
    // We can use alternate for going to home
    //return res.redirect('back')

})


//It listen to the request and provide the response 
app.listen(port,function(err){
    if(err){
        console.log("Errror in runningthe server")
        return
    }
    console.log("My Express Server is running on port :",port)
})