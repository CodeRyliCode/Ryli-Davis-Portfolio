
//requiring the express dependency
const express = require("express");

//requiring the data.json file and accessing projects properties
const {projects} = require ("./data.json")



const app = express();

//Setting up the middleware view engine to "pug"
app.set("view engine", "pug");


//using a static route AND express.static method to serve static public files
app.use("/static", express.static("public"));


/* I created an "index" route (/) to render the home page with the locals set to data.projects
 */
app.get("/", (req, res) => {
  res.render("index", {projects});
});

  //Second route for the about page
  app.get("/about", (req, res) => {
    res.render("about");
  });

// localhost:3000/projects/:id is the url route, id being 0-6
app.get("/projects/:id", (req, res)=>{
  /*'project' refers to the project.pug file where we are rendering the html.
project in project.projects refers to the parameter we choose to use that we will refer 
to in our pug templates. :projects is the object data from our data.json file.
The id is being pulled from our data.json file.*/
  res.render('project', {project:projects[req.params.id]});
  //error handling for project ids that are invalid
  const project = data.projects[id];
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Invalid Project id of ${id}: Please try a new id #`;
    next(err);
  }
});

//error handler for pages that can't be found -404
app.use((req, res, next) => {
  const err = new Error(
    "We couldn't find that page! Please check the URL and try again."
  );
  err.status = 404;
  next(err);
});

// A global error handler to deal with any server errors the app may encounter
app.use((err, req, res) => {
  err.message = err.message || "Alert! Server Error Encountered";
  res.status(err.status || 500);
  console.log(`You have reached a ${err.status} error!`);
  res.send(`Error Code: ${res.status} : ${err.message}`);
});
  


/*Setup the development server using the listen method.We have an Express router.
  This code will create a server and when I run it, the server will run on my machine. And I can
  send it requests through a special url called localhost.
  
  The listen method can take the callback function as a parameter*/
app.listen(3000, () => {
  console.log("the application is running on localhost:3000!");
});





