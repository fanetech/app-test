import * as React from "react";

//mui import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Alert,
  Backdrop,
  Card,
  CardMedia,
  Fade,
  Link,
  Modal,
  Stack,
  TextField,
} from "@mui/material";

//custom import
import { UidContext } from "./appContext";
import cookie from "js-cookie";
import API_BASIC from "./utility/api.service";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getPosts } from "../actions/post.actions";

// const pages = ["Accueil", "Article", "Mes Article", "créer"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = React.useState("");
  const [msgFile, setMsgFile] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [fileErr, setFileErr] = React.useState(false);
  const uid = React.useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  //mui function
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //custom function
  const logout = () => {
    if (window !== "undefined") {
      window.location = "/";
      cookie.remove("jwt");
    }
  };

  //model function
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setErr(false);
  };
  const handleClose = () => {
    cancel();
    setOpen(false);
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
  const handleAddItem = async (e) => {
    e.preventDefault();
    setErr(false);
    const data = {
      posterId: uid,
      title,
      description,
    };
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
            API_BASIC.post("/item", data)
              .then((res) => {
                dispatch(getPosts(5));
                handleClose();
              })
              .catch((err) => {
                console.log("handleAddIdtem error =>" + err);
              });
          });
        }
      );
    } else {
      API_BASIC.post("/item", data)
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
        setFile(files);
      } else {
        setFileErr(true);
      }
    }
  };

  //clear all variable
  const cancel = () => {
    setTitle("");
    setDescription("");
    setFile("");
    setUrl("");
    setPicture("");
  };

  return (
    <div className="app-test-navbar">
      <AppBar position="static" style={{ marginbottom: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000000a8",
                textDecoration: "none",
              }}
            >
              A-ARTICLE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link
                  href="/"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <MenuItem key={"accueil"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Accueil</Typography>
                  </MenuItem>
                </Link>

                <Link
                  href="/article"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <MenuItem key={"article"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Mes article</Typography>
                  </MenuItem>
                </Link>
                {uid && (
                  <Button
                    key={"creer"}
                    onClick={handleOpen}
                    sx={{ color: "black", textAlign: "center" }}
                  >
                    {"Créer"}
                  </Button>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              A-ARTICLE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link href="/" variant="body2">
                <Button
                  key={"accueil"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {"Accueil"}
                </Button>
              </Link>

              {uid && (
                <Link href="/article" variant="body2">
                  <Button
                    key={"article"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"Mes article"}
                  </Button>
                </Link>
              )}
              {uid && (
                <Link href="/creer" variant="body2">
                  <Button
                    key={"creer"}
                    onClick={handleOpen}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"Créer"}
                  </Button>
                </Link>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button color="inherit">{userData?.pseudo}</Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userData?.picture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!uid && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      noWrap
                      component="a"
                      textAlign="center"
                      href="/login"
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {"Connexion"}
                    </Typography>
                  </MenuItem>
                )}
                {!uid && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      noWrap
                      component="a"
                      textAlign="center"
                      href="/register"
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {"Inscription"}
                    </Typography>
                  </MenuItem>
                )}
                {uid && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      noWrap
                      component="a"
                      textAlign="center"
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      onClick={logout}
                    >
                      {"Déconnexion"}
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
                  Veuillez renseigne tout les champs. seul l'image peux être
                  null
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
              <Stack sx={{ width: "100%", marginBottom: "20px" }} spacing={2}>
                <Alert>
                  Créer un article : Seul le champs image peux très null
                </Alert>
              </Stack>
              <TextField
                fullWidth
                label="titre"
                id="fullWidth"
                sx={{
                  marginBottom: 2,
                }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="description"
                id="fullWidth"
                sx={{
                  marginBottom: 2,
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  image
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
                onClick={handleAddItem}
              >
                Créer
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default Navbar;
