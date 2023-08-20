import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { apiPost } from "../../functionsAPI";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState(false);

  React.useEffect(() => {
    var adminToken = localStorage.getItem("adminToken");
    var candidateToken = localStorage.getItem("candidateToken");
    if (adminToken !== null) {
      router.push("/adminProfile");
    }
    if (candidateToken !== null) {
      router.push("/candidateProfile");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };

    var url = null;
    var token = null;
    if (user) {
      url = "/login";
    } else {
      url = "/candidate-login";
    }

    apiPost(url, data)
      .then((res) => {
        alert("Authorized", "success");
        setIsLoading(false);
        if (user) {
          localStorage.setItem("adminToken", res.data.token);
          router.push("/adminProfile");
        } else {
          localStorage.setItem("adminToken", res.data.token);
          router.push("/candidateProfile");
        }
      })
      .catch((err) => {
        localStorage.clear();
        console.log(err);
        alert(err, "error");
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Sign in as{" "}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="candidate"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="candidate"
                  control={<Radio />}
                  label="Candidate"
                  onClick={() => setUser(false)}
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  onClick={() => setUser(true)}
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
