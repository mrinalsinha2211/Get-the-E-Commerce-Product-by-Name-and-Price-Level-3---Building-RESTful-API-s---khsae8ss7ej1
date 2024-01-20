const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());
app.get("/products/:name/:price", (req,res)=>{
const {name , price}=req.params;
const product=products.find((product)=>product.name.toLowerCase()===name.toLowerCase() && product.price===  parseInt(price))
if(product){                              
    return res.status(200).json({
        status: 'success',
        message: 'Product fetched successfully',
        data: {
            product: {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,},
        },
    })
}else{
    return res.status(404).json({
        status: "failed", 
        message: "Product not found!",
    })
}
})
// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price

module.exports = app;
