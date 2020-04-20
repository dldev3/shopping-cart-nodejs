let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('shop/index', { 
    title: 'Express', 
    author:'Dilshanka' });
});

module.exports = router;
