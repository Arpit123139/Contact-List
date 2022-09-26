
/*********************************************************  Starting the server using Expreess*********************************************** */
const express=require('express')
const path=require('path')
const port=8000;

/************************************************************For Connection With The DataBase*********************************************** */
const db =require('./config/mongoose') 
/*******************For Creating a Schema************* */
const Contact1=require('./models/contact')   // Contact is comming here that is the collection name in the dataBase and we will access in index.js using the variable Contact1
const app=express();
/********************************************************************************************************************************************* */


/***********************************Telling express to use ejs View Engine */
app.set('view engine','ejs')
/***********************************Telling the name of the folder and specify the path where the views are stored(.ejs files) */
app.set('views',path.join(__dirname,'views'))

//Setting the parser / MiddleWare  parses the data and convert it into key-value pair 
app.use(express.urlencoded())

/*****************************Middle Ware for Static Files  */
app.use(express.static('assets'))
/************************************Middleware1**/
// app.use(function(req,res,next){               // next make the changes and passes too the nexxt middleware 

//     req.myName="Arpan"
//     console.log(" Middleware 1 Called")
//     next()              // The controll is pass sto the next middleware
// }) 

// Middleware 2

/*****************************MiddelWare 2********** */
// app.use(function(req,res,next){               // next make the changes and passes too the nexxt middleware 

//     console.log("My name from MW 2 ",req.myName)
//     console.log(" Middleware 2  Called")
//     next()              // The controll is pass sto the next middleware
// }) 

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
   // console.log("From the get route controller ",req.myName)

    // passing the data from the server to the browser if it returns now it renders the page and send it to home in res.locals but as locals is a global object we can access it as title instead of locals.title 
    //this is a type of context that we are passing


    /*****************Fetchiong the data from the dataBase******************** */
        Contact1.find({},function(err,contacts){
            if(err){
                console.log("Error in fetching contact from db")
                return;
            }
            return res.render('home',{

                title: "Contact List",
                contact_list:contacts
            
            })


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
    // contactList.push({
    //     name:req.body.my_name,
    //     phone:req.body.my_phone
    // })

    /**************Populating the Database when we enter contacts throught the form ********** */
    /*****Contact1 is the variable defined which contains the Contact whichis exportes from the contact.js file in the models and it is the name of the Collection in the database  */
 
    Contact1.create({
        name:req.body.my_name,
        phone:req.body.my_phone
    },function(err,newContact){
        if(err){
            console.log("error in creating the contact")
            return;
        }
        console.log("**************", newContact )
        return res.redirect('/')
    })
    
    // return res.redirect('/')
    // We can use alternate for going to home
    //return res.redirect('back')

})

app.get('/delete-contact/:id',function(req,res){

    console.log(req.params)
    // get the is when the delete button is clicked the id is from the database  
    let idParam=req.params.id;

    /********************This is when we are deleting using a static list  Now we will use the database****************/

    // let contactIndex=contactList.findIndex(contact=>contact.phone==phoneParam)

    // if(contactIndex != -1){

    //     contactList.splice(contactIndex,1)
    // }

    /*****************************Now we delete from the databse    The below function is already defined ************ */
    Contact1.findByIdAndDelete(idParam,function(err){
        if(err){
            console.log("Error in deleting the object from the datbase")
            return
        }
    })
    return res.redirect('back')
     

})

//It listen to the request and provide the response 
app.listen(port,function(err){
    if(err){
        console.log("Errror in runningthe server")
        return
    }
    console.log("My Express Server is running on port :",port)
})