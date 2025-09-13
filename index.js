const express=require('express');
const connectDB=require('./Config/DB');
const app = express();
const cors=require('cors');
const fileupload = require("express-fileupload");
const Product = require("./Routes/Product");
const Authentication = require("./Routes/Auth");
const orders = require("./Routes/Orders");
const PORT=process.env.PORT || 3000;
const cloudinaryDb=require("./Config/CloudinaryDb");
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

//connect to database
connectDB();
//connect to cloudinary db 

cloudinaryDb();
app.use("/api/v1/auth", Authentication);
app.use("/api/v1/product", Product);
app.use("/api/v1/orders",orders);

app.get("/",(req,res)=>{
    res.json({
        message:"ShopKaro Backend"
    })
})


app.listen(PORT,  ()=>{
 
    console.log(`servre is listening on port ${PORT}`);
})



