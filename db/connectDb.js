const mongoose = require('mongoose');
//mongo db cluster url
const liveURL = 'mongodb+srv://manoramajoshi01061999:manu01@cluster0.yyzwsde.mongodb.net/?retryWrites=true&w=majority'
const connectDb = () =>{
    return mongoose.connect(liveURL)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDb