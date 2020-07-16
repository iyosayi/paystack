// const { response } = require("express");

// function favoritePupper(favorite) {
//   return new Promise((resolve, reject) => {
//     if (favorite === "corgi") {
//       resolve(favorite);
//     } else {
//       reject("Your preference is incorrect.");
//     }
//   });
// }

// function getFavoritePupperBroken() {
//   const pupper = favoritePupper("corgi");

//   console.log(`The favorite pupper is a ${pupper}`);
// }

// // console.log(getFavoritePupperBroken());

// // console.log(getFavoritePupper());

// (function favoritePupper(favorite) {
//   return new Promise((resolve, reject) => {
//     if (favorite === "corgi") {
//       resolve(favorite);
//     } else {
//       reject("baddd");
//     }
//   });
// })();

// (function getFavoritePupper() {
//   const pupper = favoritePupper("corgi");

//   pupper
//     .then((dog) => {
//       console.log(`My favorite pupper is a ${dog}`);
//     })
//     .catch((e) => console.log(e));
// })();

function asyncThing1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Thing 1 is done"), 2000);
  });
}

function asyncThing2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Thing 2 is done"), 2000);
  });
}

async function doThings() {
  const p1 = await asyncThing1();
  const p2 = await asyncThing2();
  const [thing1, thing2] = await Promise.all([p1, p2]);
  console.log(thing1);
  console.log(thing2);
}

// console.log(doThings());

function getBlogPosts() {
  const posts = [
    { id: 1, title: "Post One", body: "A blog post!" },
    { id: 2, title: "Post Two", body: "Another blog post!" },
    { id: 3, title: "Post Three", body: "A third blog post!" },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(posts), 200);
  });
}
function getBlogComments(postId) {
  const comments = [
    { postId: 1, comment: "Great post!" },
    { postId: 2, comment: "I like it." },
    { postId: 1, comment: "You make interesting points." },
    { postId: 3, comment: "Needs more corgis." },
    { postId: 2, comment: "Nice work!" },
  ];
  // get comments for the given post
  const postComments = comments.filter((comment) => comment.postId === postId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(postComments), 300);
  });
}

// -------------------------------------------------------------------
// this is the code that actually loads data
// -------------------------------------------------------------------

function loadContent() {
  getBlogPosts().then((posts) => {
    for (post of posts) {
      getBlogComments(post.id).then((comments) => {
        console.log({ ...post, comments });
      });
    }
  });
}
console.log(loadContent());
