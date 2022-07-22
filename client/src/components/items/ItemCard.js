import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { dateparser } from "../utility/utils";
import API_BASIC from "../utility/api.service";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { UidContext } from "../appContext";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ItemCard = ({ post, count }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isAuthor, setIsAuthor] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = React.useState("");
  const [msgFile, setMsgFile] = React.useState("");
  const [dataUpdate, setDataUpdate] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [fileErr, setFileErr] = React.useState(false);
  const uid = React.useContext(UidContext);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handledelede = (e, id) => {
    e.preventDefault();

    if (window.confirm("Voulez vous supprimer cet article ?")) {
      API_BASIC.delete(`/item/${id}`)
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          }
          if (res.data.data) {
            dispatch(getPosts(count));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  //model function
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e, data) => {
    e.preventDefault();
    setOpen(true);
    setDataUpdate(data);
    setUrl(data?.picture);
  };
  const handleClose = () => {
    setOpen(false);
    cancel();
  };

  //modal style

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //handled create new article
  const handleEditItem = async (e) => {
    e.preventDefault();
    setErr(false);
    const data = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (file) {
      let pathToFirebase;
      const date = Date.now();
      //recupération du chemain de stockage
      switch (file.type) {
        case "image/png":
          pathToFirebase = `uploads/app-test/${uid}.${date}.jpg`;
          break;
        case "image/jpg":
          pathToFirebase = `uploads/app-test/${uid}.${date}.jpg`;
          break;
        case "image/jpeg":
          pathToFirebase = `uploads/app-test/${uid}.${date}.jpg`;
          break;
        default:
          break;
      }
      //Envoi a firebase storage
      const metaData = {
        contentType: file.type,
      };

      const storageRef = ref(storage, pathToFirebase);
      const uploadTask = uploadBytesResumable(storageRef, file, metaData);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            data.picture = downloadURL;
            API_BASIC.put(`/item/${dataUpdate._id}`, data)
              .then((res) => {
                if (res.data.data) {
                  dispatch(getPosts(5));
                  handleClose();
                } else {
                  setErr(true);
                }
              })
              .catch((err) => {
                console.log("handleAddIdtem error =>" + err);
                setErr(true);
              });
          });
        }
      );
    } else {
      API_BASIC.put(`/item/${dataUpdate._id}`, data)
        .then((res) => {
          console.log(res.data);
          dispatch(getPosts(5));
          handleClose();
        })
        .catch((err) => {
          console.log("handleAddIdtem error =>" + err);
          setErr(true);
        });
    }
  };

  //handled picture
  const handlePicture = async (e) => {
    setFileErr(false);
    setMsgFile("");
    const files = e.target.files[0];

    if (files) {
      if (
        files.type === "image/jpg" ||
        files.type === "image/jpeg" ||
        files.type === "image/png"
      ) {
        setUrl(URL.createObjectURL(files));
        console.log(URL.createObjectURL(files));

        setFile(files);
      } else {
        setFileErr(true);
      }
    }
  };
  const cancel = () => {
    setTitle("");
    setDescription("");
    setFile("");
    setPicture("");
  };

  React.useEffect(() => {
    const checkAuthor = () => {
      if (uid == post.posterId) setIsAuthor(true);
      console.log(isAuthor);
    };
    checkAuthor();
  }, [uid, post._id]);

  return (
    <div className="home-item-item">
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={dateparser(post?.createdAt)}
        />
        {post?.picture && (
          <div className="card-pic">
            <CardMedia
              component="img"
              height="400"
              image={post?.picture}
              alt="Paella dish"
            />
          </div>
        )}
        {post?.description && (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post?.description}
            </Typography>
          </CardContent>
        )}
        <CardActions disableSpacing>
          {isAuthor && (
            <>
              <IconButton
                aria-label="modifier"
                onClick={(e) => handleOpen(e, post)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="supprimer"
                onClick={(e) => handledelede(e, post._id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>{post?.description}</Typography>
            </CardContent>
          
        </Collapse> */}
      </Card>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {err && (
                <Alert
                  key={err}
                  variant="outlined"
                  severity="error"
                  sx={{
                    marginBottom: 2,
                  }}
                >
                  Une erreur c'est produit veuillez réessayer
                </Alert>
              )}
              {fileErr && (
                <Alert
                  key={err}
                  variant="outlined"
                  severity="error"
                  sx={{
                    marginBottom: 2,
                  }}
                >
                  Format pas pris en charge. les formats pris en charge sont
                  (.png, .jpg, .jpeg)
                </Alert>
              )}
              <TextField
                fullWidth
                label="titre"
                id="fullWidth"
                defaultValue={dataUpdate?.title}
                sx={{
                  marginBottom: 2,
                }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="description"
                id="fullWidth"
                defaultValue={dataUpdate?.description}
                sx={{
                  marginBottom: 2,
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  Image
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handlePicture}
                  />
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              </Stack>
              {url && (
                <Card
                  sx={{
                    maxWidth: 345,
                    marginTop: 3,
                    marginBottom: 3,
                    maxHeight: 200,
                    justifyContent: "center",
                  }}
                >
                  <img
                    width={"100%"}
                    height={"100%"}
                    src={url}
                    alt="article pic"
                  />
                </Card>
              )}

              <Button
                variant="contained"
                style={{ margin: "0 auto", display: "flex" }}
                onClick={handleEditItem}
              >
                Enregistré
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ItemCard;
