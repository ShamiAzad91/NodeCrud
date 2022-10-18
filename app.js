const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/user");
const express = require("express");
const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Db Connected')
}).catch((err)=>{
    console.log(err);
})

app.get("/home",(req,res)=>{
res.send("hello world")
});

app.use("/api",authRoutes);

const port = 8000;

app.listen(port,()=>{
    console.log(`Server is up and running at ${port}`)
});

