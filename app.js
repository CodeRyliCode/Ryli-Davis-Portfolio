//requiring the express dependency
const express = require("express");
//requiring the data.json file
const dataJson = require("./data.json");

const app = express();

//Setting up the middleware view engine to "pug"
app.set("view engine", "pug");

//using express.static method to serve static public files
app.use(express.static("public"));

/*Setup the development server using the listen method.We have an Express router.
  This code will create a server and when I run it, the server will run on my machine. And I can
  send it requests through a special url called localhost.
  
  The listen method can take the callback function as a parameter*/
app.listen(3000, () => {
  console.log("the application is running on localhost:3000!");
});

/* I created an "index" route (/) to render the home page with the locals set to data.projects
 */
app.get("/", (req, res) => {
  res.locals = { data: 'projects' } ;
  res.render("index");
});


/*An "about" route (/about) to render the "About" page
Dynamic "project" routes (/project/:id or /projects/:id) based on the id of the project that render a customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
Finally, start your server. Your app should listen on port 3000, and log a string to the console that says which port the app is listening to.*/
