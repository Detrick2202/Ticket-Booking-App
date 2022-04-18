var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const fs =require('fs');
var nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next){
  res.render('contact');
})
router.get('/gallery', function(req, res, next){
  res.render('gallery');
})
router.post('/submit', function(req, res, next){
  let name= req.body.name;
  let email= req.body.email;
  let number= req.body.number;
  fs.appendFile('data.txt',`name:${name},email:${email},number:${number}\n`,function(err){
    if(err){
      console.log(err);
    }
  });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:"detrick2202@gmail.com",
      pass:"(detrick2202@)"   }
  });
  var mailOptions={
    from:"ratedr@gmail.com",
    to:req.body.email,
    subject:"Ticket Booking",
    text:"Booking Successful. Have a nice day!"
  }
  transporter.sendMail(mailOptions,function(error, info){
    if(error){
      console.log(error);
    } else{
      res.render('success');
    }
  });
})


module.exports = router;
