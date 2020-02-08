const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bus = new Schema({
    bus_type: {
        type: String
    },
    source: {
        type: String
    },
    destination:{
        type: String
    },
    ddate: {
        type: String
    },
    departure_time:  {
        type: String
    },
    arrival_time: {
        type: String
    },
    fare:   {
        type: Number
    },
    stops:  {
        type: Number
    },
    available_seats:  {
        type: Number
    },
    status:  {
        type: String
    },
});
module.exports=mongoose.model('Bus', Bus)// we are creating a model based on our schema Bus