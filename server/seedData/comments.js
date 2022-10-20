const comments = [
  {
    postId: 1,
    isParent: true,
    username: 'byoonster',
    body: "I would have to agree with you that this project is indeed lit!",
    likes: 1,
  },
  // {
  //   commentId: 1,
  //   userId: 1,
  //   body: "yeah this different title is cool!",
  //   likes: 10,
  // },
  {
    postId: 1,
    username: 'byoonster',
    body: "I am adding on to my previous comment",
    likes: 1,
  },
  {
    postId: 2,
    username: 'jonnyboi',
    body: "I would have to agree with you that this project is indeed lit!",
    likes: 10,
  },
  {
    username: 'jonnyboi',
    isParent: false,
    commentId: 1,
    body: "TESTING NESTED COMMENTS",
    likes: 5,
  },
  {
    postId: 3,
    username: 'byoonster',
    isParent: false,
    body: "TESTING NESTED COMMENTS",
    likes: 5,
  },
];

module.exports = comments;
