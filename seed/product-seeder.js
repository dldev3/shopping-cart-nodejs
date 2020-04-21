let Product = require('../models/product');
let mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin123@cluster0-l7vnq.mongodb.net/shopping-cart-node?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


let products = [
    new Product({
    imagePath: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title:"Apple Iphone SE 2",
    description:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little " +
        "bit longer.This is a wider card with supporting text below as a natural lead-in to additional content",
    price: 199,
}),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        title:"Apple Iphone 8",
        description:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little " +
            "bit longer.This is a wider card with supporting text below as a natural lead-in to additional content",
        price: 699,
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        title:"Apple Iphone XR",
        description:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little " +
            "bit longer.This is a wider card with supporting text below as a natural lead-in to additional content",
        price: 999,
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        title:"Apple Iphone X",
        description:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little " +
            "bit longer.This is a wider card with supporting text below as a natural lead-in to additional content",
        price: 999,
    })
];

let  done = 0;

for (let i = 0; i < products.length; i++){
    products[i].save((err, result)=>{
        done++;
        if(done==products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}


