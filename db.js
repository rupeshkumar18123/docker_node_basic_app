
const mongoose = require("mongoose");
const uri = "mongodb://admin:qwerty@localhost:27017";
mongoose.connect(uri)
.then(()=>{
    console.log("mongodb connected successfully");
}).catch((err)=>{
    console.log("mongodb connection failed",err);
})
module.exports = mongoose;
