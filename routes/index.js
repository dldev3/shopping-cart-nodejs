let express = require('express');
let router = express.Router();
let Product = require('../models/product');

/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find((err,docs)=>{
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', {
      products: productChunks
    });
  });
});

module.exports = router;
