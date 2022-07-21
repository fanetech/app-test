import * as React from "react";
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
import { UidContext } from "./appContext";
import cookie from "js-cookie";
import { Link } from "@mui/material";
import API_BASIC from "./utility/api.service";
import { useSelector } from "react-redux";

// const pages = ["Accueil", "Article", "Mes Article", "créer"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const uid = React.useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

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
  const logout = () => {
    if (window !== "undefined") {
      window.location = "/";
      cookie.remove("jwt");
    }
  };

  return (
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
              color: "inherit",
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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
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
                href="/all-article"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <MenuItem key={"allArticle"} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Article</Typography>
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
                <Link
                  href="/creer"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Button
                    key={"creer"}
                    onClick={handleCloseNavMenu}
                    sx={{ color: "black", textAlign: "center" }}
                  >
                    {"Créer"}
                  </Button>
                </Link>
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
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            <Link href="/" variant="body2">
              <Button
                key={"accueil"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Accueil"}
              </Button>
            </Link>
            <Link href="/all-article" variant="body2">
              <Button
                key={"Allarticle"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Article"}
              </Button>
            </Link>
            <Link href="/article" variant="body2">
              <Button
                key={"article"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Mes article"}
              </Button>
            </Link>
            {uid && (
              <Link href="/creer" variant="body2">
                <Button
                  key={"creer"}
                  onClick={handleCloseNavMenu}
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  noWrap
                  component="a"
                  textAlign="center"
                  href="/profil"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {"Profil"}
                </Typography>
              </MenuItem>
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
  );
};
export default Navbar;
