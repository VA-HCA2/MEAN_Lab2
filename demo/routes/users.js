var express = require('express');
var router = express.Router();
const fs = require("fs");

const authorization = require('./../utils/auth');
// get users login page
router.get('/login', (request, response) => {
  response.render('login', { pageTitle: 'Login' });
});

// get users register page
router.get('/register', (request, response) => {
  response.render('register', { pageTitle: 'Register' });
});

// Authentication of users login. Post request//

router.post('/login', function (request, response, next) {
  users = getUsers();

  // get user data from form
  var username = request.body.username;
  var password = request.body.password;
  if (authorization.authorize(username, password, users)) {
    request.session.username = username;
    console.log(request.session.username)
    response.statusCode = 200;
    console.log("success");
    response.end();
  } else {
    request.session.username = null;
    response.statusCode = 403; // Forbidden
    response.end();
  }
});

router.get('/logout', function (req, res, next) {
  req.session.username = null;
  res.redirect('/');
});


// Post request for register //
router.post('/register', function (request, response) {

  // get user data from form
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.password;

  user = insertUser(username, email, password);
  if (user) {
    response.statusCode = 200;
    response.end();
  } else {
    response.statusCode = 403; // Forbidden
    response.end();
  }

});

// Insert a User
var insertUser = (username, email, password) => {
  var users = getUsers();

  // in ES6, if param and prop names are the same
  var user = {
    username,
    email,
    password
  };

  // ensure no dups
  var duplicateUsers = users.filter((user) => {
    return (user.username === username || user.email === email);
  });

  // persist the users
  if (duplicateUsers.length === 0) {
    users.push(user);
    saveUsers(users);
    return user;
  }

};

// persist data in file
var saveUsers = (users) => {
  fs.writeFileSync('data/users.json', JSON.stringify(users));
};

// //  get all Users
var getUsers = function () {
  try {
    var usersString = fs.readFileSync('data/users.json');
    return JSON.parse(usersString);
  } catch (err) {
    console.log(err);
    return [];
  }
}

//neo is the best
module.exports = router
