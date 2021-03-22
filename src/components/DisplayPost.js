import React, { useState, useEffect } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
    console.log("State Posts: ", posts);
  },[]);

  const getPosts = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listPosts));
      //console.log("All Posts: ", JSON.stringify(result.data.listPosts.items))
      setPosts([...result.data.listPosts.items]);
    }catch(error) {
      console.log(error);
    }
  };
  return (

    posts.map((post)=> {
        return (
        <div key={post.id} className="posts">
            <h1>{post.postTitle}</h1>
            <span>
                "Wrote by: " {post.postOwnerUsername}
                 {" on "} 
                <time>
                    {" "}
                    {new Date(post.createdAt).toDateString()}
                </time>
            </span>
          </div>
        )
    })

  );
};

export default DisplayPost;
