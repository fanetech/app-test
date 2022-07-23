import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import API_BASIC from "../utility/api.service";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        A-ARTICLE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [fieldErr, setFieldErr] = React.useState("");
  const [passErr, setPassErr] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isResus, setIsResus] = React.useState(false);

  //get pseudo, email, password and add to DB
  const handleSubmit = (event) => {
    setFieldErr("");
    setPassErr("");
    event.preventDefault();

    if (pseudo && email && password && passwordConfirm) {
      if (password === passwordConfirm) {
        const data = {
          pseudo,
          email,
          password,
        };

        //send data
        API_BASIC.post("/user/register", data)
          .then((res) => {
            if (res.data.errors) {
              setMessage(res.data.errors);
            }
            if (res.data.data) {
              setIsResus(true);
            }
          })
          .catch((err) => {
            console.log("login error => " + err);
          });
      } else {
        setPassErr("Les mots de passes ne correspond pas");
      }
    } else {
      setFieldErr("Veuillez renseigner tous les champs");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            INSCRIPTION
          </Typography>
          {isResus && (
            <Alert key={fieldErr} variant="outlined" severity="success">
              Enregistrement reussi veuillez vous connecter
            </Alert>
          )}
          {fieldErr && (
            <Alert key={fieldErr} variant="outlined" severity="error">
              Veuillez renseigner tous les champs
            </Alert>
          )}
          {passErr && (
            <Alert key={passErr} variant="outlined" severity="error">
              Les mots de passes ne correspond pas
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Pseudo"
                  autoFocus
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmer Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              INSCRIPTION
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Vous avez un compte ? connexion
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
