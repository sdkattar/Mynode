






























































































































































































const mysql = require("mysql");
var express = require("express");
//var Joi =require("joi");
var emprouter =  express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'mydatabase'
  });

var myData =[];
connection.connect();

// function validate(bodyContent)
// {
//     const schema = {
//         "Name": Joi.string().length(6).required(),
//         "No": Joi.number().required(),
//         "Address": Joi.required()
//         };
//    return Joi.validate(bodyContent , schema);
// }

emprouter.post("/",function(request, response){

   // let resultOfValidation= null; //validate(request.body);
    //console.log(resultOfValidation);
    //if(resultOfValidation.error==null)
//{
    console.log(request);
    let eno = parseInt(request.body.no);
    let ename = request.body.name;
    let eddress = request.body.address; 

    console.log(eno);

    let query = `insert into emp values(${eno}, '${ename}', '${eddress}')`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
//}
//else{
  //  response.contentType("application/json");
   // response.send(JSON.stringify(resultOfValidation));
//}       
});


emprouter.put("/:No",function(request, response){
    
    let eno = parseInt(request.params.No);
    let ename = request.body.name;
    let eddress = request.body.address; 
    console.log(request.body);
    let query = `update emp set name= '${ename}',address= '${eddress}' where no=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {   
           response.contentType("application/json");
           response.send(err); 
        }
    });
        
});

emprouter.delete("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let query = `delete from emp where no=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
        
});



emprouter.get("/", function(request, response){
    connection.query("select * from emp", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});

emprouter.get("/:No", function(request, response){
    console.log("You searched for " + request.params.No);
    
    connection.query(`select * from emp where no =${request.params.No}`, function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});

module.exports = emprouter;










//var config = require("config");
var express = require("express");
var adminRoutes= require("./routes/admin");
var empRoutes= require("./routes/emp");
var app =  express();

//const port = parseInt(config.get("port"));
const port=4000;




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Use Middleware
app.use(express.json());
app.use("/admin",adminRoutes);
app.use("/employees",empRoutes);

//listen to port for requests
app.listen(port, function(){
    console.log("Server Started on port  " + port );
})


































