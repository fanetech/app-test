import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import ItemCard from "../components/items/ItemCard";
import { isEmpty } from "../components/utility/utils";

function Home(props) {
  const usersData = useSelector((state) => state.usersReducer);
  const [loadPost, setLoadPost] = useState(true);

  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  console.log(posts);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);
  return (
    <div className="home-conatiner">
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          return (
            <>
              <ItemCard post={post} count={count} key={post._id} />
            </>
          );
        })}
    </div>
  );
}

export default Home;
