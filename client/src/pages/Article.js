import { Alert, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { UidContext } from "../components/appContext";
import ItemCard from "../components/items/ItemCard";
import { isEmpty } from "../components/utility/utils";

function Article(props) {
  const posts = useSelector((state) => state.allPostReducer);
  const uid = React.useContext(UidContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(posts);
  return (
    <div className="home-conatiner">
      <Stack sx={{ width: "100%", marginBottom: "20px" }} spacing={2}>
        <Alert>
          Espace vos article : Ici vous pouvez afficher tous vous articles
        </Alert>
      </Stack>
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          if (post?.posterId === uid) {
            return (
              <>
                <ItemCard post={post} count={null} key={post._id} />
              </>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}

export default Article;
