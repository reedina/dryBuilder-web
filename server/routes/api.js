const express = require('express');
const router = express.Router();
const request = require('request');
const bodyParser = require('body-parser');



const options = {
    url: 'http://localhost:4040/api/users',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Host': 'basic-user'
    }
  };


const options2 = {
  url: 'http://localhost:4040/api/user',
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Host': 'basic-user'
  }
};
/*
const options = {
  url: 'http://localhost:8000/',
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Host': 'basic-user'
  }
};
*/

router.get('/users', function(req, res) {
  

   request(options, function(err1, res1, body1) {
    console.log(`response error: ${err1}`);
    console.log(`response status code: ${res1.statusCode}`);
    console.log(`response header: ${res1.headers['content-type']}`);
    console.log(`response body: ${body1}`);
      let obj = JSON.parse(body1);
      
      /*
           Convert the JSON response thats a string value into an actual javascript object we
          can work with

          This is where i can go ahead and aggregate services

      */
      //console.log(obj.data);
      //console.log(obj);


      /*
        we return a JSON object to be processed by the Angular service
        the json object is returned as a string
      */
     res.json(obj);

   });

});


router.post('/user', function(req, res) {
  
    console.log(`REQUETS: ${req.body}`)
    let obj = JSON.parse(req);
    console.log( `REQ: ${obj}`)
   request(options2, function(err1, res1, body1) {
    console.log(`response error: ${err1}`);
    console.log(`response status code: ${res1.statusCode}`);
    console.log(`response header: ${res1.headers['content-type']}`);
    console.log(`response body: ${body1}`);
      let obj = JSON.parse(body1);
      
      /*
           Convert the JSON response thats a string value into an actual javascript object we
          can work with

          This is where i can go ahead and aggregate services

      */
      //console.log(obj.data);
      //console.log(obj);


      /*
        we return a JSON object to be processed by the Angular service
        the json object is returned as a string
      */
     res.json(obj);

   });

});


module.exports = router;
