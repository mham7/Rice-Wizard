import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Email } from "@mui/icons-material";
import { adminUID } from "../../firebase";
import wheatImage from "../../wheat.png";
import NB from "../../nv.png";
import logo from "../../Untitled.png"



const Login = () => {
  const [error, setError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: null });
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === adminUID) {
          // User is an admin
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        } else {
          // User is not an admin
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const generateResetPasswordLink = () => {
    try {
      const actionCodeSettings = {
        url: "https://ricewizard-2c15b.firebaseapp.com/__/auth/action?mode=action&oobCode=code",
        handleCodeInApp: true, // Enable to handle the code in your app
      };
  
      sendPasswordResetEmail(auth, email, actionCodeSettings)
        .then(() => {
          setOpenPopup(true);
        setPopupMessage("Reset password email has been sent!");

          
        })
        .catch((error) => {
          
          console.error("Error generating reset password link:", error);
        });
    } catch (error) {
      console.error("Error generating reset password link:", error);
    }
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  

  

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
      <img src={logo} style={{ margin: '0px', width: '150px', height: '150px'}} />        
     
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            ),
          }}
        />
  
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="forgot-password-wrapper">
          <Typography
            variant="body2"
            color="primary"
            onClick={generateResetPasswordLink}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
        </div>
        <Button variant="contained" type="submit">
          Sign In
        </Button>
        {error && <span>Wrong Email or Password</span>}
      </form>
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent>{popupMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
        }
export default Login;
