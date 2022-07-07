//requiring the express dependency
const express = require('express');
//requiring the data.json file
const dataJson = require('./data.json');


const app = express();
  
//Setting up the middleware view engine to "pug"
app.set("view engine", "pug");

//using express.static method to serve static public files
app.use(express.static('public'));

  /*Setup the development server using the listen method.We have an Express router.
  This code will create a server and when I run it, the server will run on my machine. And I can
  send it requests through a special url called localhost.
  
  The listen method can take the callback function as a parameter*/
  app.listen(3001, () => {
    console.log("the application is running on localhost:3001!");
  });
