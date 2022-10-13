const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

//Having an index paqge for our exports allows us to require these variables 
//all from this one file
module.exports = {
  users,
  posts,
  comments
}