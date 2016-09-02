
authors = [
  {
    id: 1,
    name: "Monica",
    posts: [
      {id: 1,
       title: "how to write fast js"}
    ]
  },
  {
    id: 2,
    name: "John",
    posts: [
      {id: 2,
       title: "how to write slow js"}
    ]
  }
]
var posts =[];
author.map(function(author){
  author.posts.forEach(function(post, i){
    post.author_id = author.id;
    posts.push(post);
  });
  delete author["posts"];
  return author;
});
