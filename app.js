//requiring the express dependency
const express = require("express");

//requiring the data.json file and accessing projects properties
const { projects } = require("./data.json");

const app = express();




//Setting up the middleware view engine to "pug"
app.set("view engine", "pug");

//using a static route AND express.static method to serve static public files
app.use("/static", express.static("public"));

/* I created an "index" route (/) to render the home page with the locals set to data.projects
 */
app.get("/", (req, res) => {
  res.render("index", { projects });
});


//Second route for the about page
app.get("/about", (req, res) => {
  res.render("about");
});

// localhost:3000/projects/:id is the url route, id being 0-6
app.get("/projects/:id", (req, res) => {
  const projectData = projects[req.params.id];
  // check if a project with a certain id exist
  if (projectData === undefined) {
    // if it does not, we create a new Error
    const err = new Error();
    // The page will have a 404 not found error status
    err.status = 404;
    // Custom error message for the user
    err.message = "So sorry, this project does not exist!";
    // We render the 404 page, passing error
    res.render("page-not-found", { err });
  } else {
    /*Else we render the project that exists! 
'project' refers to the project.pug file where we are rendering the html.
project in project:projects refers to the parameter we choose to use that we will refer 
to in our pug templates. :projects is the object data from our data.json file.
The id is being pulled from our data.json file.*/
    res.render("project", { project: projects[req.params.id] });
  }
});

// 404 handler
app.use((req, res) => {
  const err = new Error();
  err.status = 404;
  err.message = "So sorry, this page does not exist!";
  res.render('page-not-found', {err});
})



//  Global Error Handler
app.use((err, req, res, next) => {
 if (err.status === 404){
   res.render('page-not-found', { err })
 }else{
   err.message = "There was a server error!";
   res.status(500);
   res.render('error', { err });
 }
 console.log(`You have hit a ${err.status} error!`);
});

/*Setup the development server using the listen method.We have an Express router.
  This code will create a server and when I run it, the server will run on my machine. And I can
  send it requests through a special url called localhost.
  
  The listen method can take the callback function as a parameter*/
app.listen(3000, () => {
  console.log("the application is running on localhost:3000!");
});


