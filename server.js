  const express = require('express');
  const app = express();
  const bodyParser= require('body-parser');
  const cors =require('cors');
  const mongoose=require('mongoose');
  const BusRoutes=express.Router();//getting routes
  const PORT=4000;

  let Bus=require('./bus.model');//importing our model Bus

  app.use(cors());
  app.use(bodyParser.json());
  mongoose.connect('mongodb://127.0.0.1:27017/busdb',{useNewUrlParser:true} );
  const connection=mongoose.connection;
  connection.once('open', function(){
    console.log("MonogoDB database connection established successfully");
  })
//attaching end points and implementing logic when http requests are send
BusRoutes.route('/').get(function(req, res){
    Bus.find(function(err, busdb)//busdb
    {
      if(err){
        console.log(err);
      }
      else{
        res.json(busdb)//we are getting data from database
      }
    });
});


//get specific bus
BusRoutes.route('/:id').get(function(req,res){
  let id = req.params.id;
  Bus.findById(id, function(err,busdb){
    res.json(busdb)
  });
});

//adding busses
BusRoutes.route('/add').post(function(req,res) {
  // Array of JSON Objects
if (req.body.batch){
  //  let busdb= Bus.create(req.body.batch);
  //  busdb.save()
  //  .then(busdb => {
  //    res.status(200).json({'busdb':' Multiple bus data added successfully'});
 
  //  })
  //  .catch(err=>{
  //    res.status(400).send('adding new bus data failed');
  //  });
  Bus.create(req.body.batch, function(err){
    if(err)
      res.send(err);
    else
    {
      res.json(req.body);
    }
  });

}
// Single JSON Object
else {
  let busdb =new Bus(req.body);
  busdb.save()
  .then(busdb => {
    res.status(200).json({'busdb':'bus data added successfully'});

  })
  .catch(err=>{
    res.status(400).send('adding new bus data failed');
  });
}
});

BusRoutes.route('/update/:id').post(function(req,res){
  Bus.findById(req.params.id, function(err, busdb){
    if(!busdb)
    res.status(404).send('data is not found');
    else
    busdb.bus_type=req.body.bus_type;
    busdb.source=req.body.source;
    busdb.destination=req.body.destination;
    busdb.ddate=req.body.ddate;
    busdb.departure_time=req.body.departure_time;
    busdb.arrival_time=req.body.arrival_time;
    busdb.fare=req.body.fare;
    busdb.stops=req.body.stops;
    busdb.available_seats=req.body.available_seats;
    busdb.status=req.body.status;

    busdb.save().then(busdb=>{
      res.json('Data updated');
    })
    .catch(err =>{
      res.status(400).send("Update not possible");
    });
  });
});


 app.use('/busdb', BusRoutes );//inserting router that is attached to url parse



  app.listen(PORT, function(){
      console.log("Server is running on PORT : "+ PORT)
  });
