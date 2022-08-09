import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Typography } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";

import { Validate, ValidationGroup } from "mui-validate";

import {
 StyledAvatar,
 StyledBoxLinks,
 StyledButton,
 StyledCheckbox,
 StyledContainer,
 StyledCopyright,
 StyledFormControlLabel,
 StyledInput,
 StyledLink,
 StyledStack,
 StyledSuccesInput,
 StyledTitle,
} from "../../components";

import { validEmail, validPassword } from "../../common/validation";

import { IUser } from "../../types/IUser";

interface IProps {
 setUser: (user: string) => void;
}

const LoginPage = ({ setUser }: IProps) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [remember, setRemember] = useState(false);
 const [dataBase, setDataBase] = useState<IUser[]>([]);
 const [isAlert, setIsAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState("");
 const [isEmailValid, setIsEmailValid] = useState(false);
 const [isPasswordValid, setIsPasswordValid] = useState(false);

 const navigate = useNavigate();

 useEffect(() => {
  const localUser = window.localStorage.getItem("dataBase");
  if (localUser) setDataBase(JSON.parse(localUser));
 }, []);

 const handleSubmit = () => {
  if (email && password) {
   const data = { email, password };

   if (
    !dataBase.find(
     (el) => el.email === data.email && el.password === data.password,
    )
   )
    return handleAlert("Email or password is incorrect");

   if (remember) {
    window.localStorage.setItem("user", JSON.stringify(data));
   } else {
    window.localStorage.setItem("user", "");
   }
   navigate("/");
   setUser(JSON.stringify(data));
  } else {
   return handleAlert("Fields are not filled");
  }
 };

 const handleAlert = (message: string) => {
  setIsAlert(true);
  setAlertMessage(message);
  setTimeout(() => {
   setAlertMessage("");
   setIsAlert(false);
  }, 5000);
 };

 return (
  <StyledContainer>
   <StyledAvatar>
    <LockIcon />
   </StyledAvatar>
   <StyledTitle variant="h5">Sign in</StyledTitle>
   <ValidationGroup>
    <StyledStack spacing={2}>
     <Validate
      regex={[validEmail, "Email isn't valid"]}
      name={"Email Address*"}
      after={(res) => {
       setIsEmailValid(res.valid);
      }}
     >
      {isEmailValid ? (
       <StyledSuccesInput
        label="Email Address*"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setEmail(e.target.value)
        }
        fullWidth
        autoFocus
       />
      ) : (
       <StyledInput
        label="Email Address*"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setEmail(e.target.value)
        }
        fullWidth
       />
      )}
     </Validate>
     <Validate
      regex={[validPassword, "Password isn't valid"]}
      name={"Password*"}
      after={(res) => {
       setIsPasswordValid(res.valid);
      }}
     >
      {isPasswordValid ? (
       <StyledSuccesInput
        label="Password*"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setPassword(e.target.value)
        }
        fullWidth
        autoFocus
       />
      ) : (
       <StyledInput
        label="Password*"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setPassword(e.target.value)
        }
        fullWidth
       />
      )}
     </Validate>
     <StyledFormControlLabel
      control={
       <StyledCheckbox
        icon={<CropSquareOutlinedIcon />}
        checkedIcon={<CheckBoxOutlinedIcon />}
       />
      }
      label="Remember me"
      value={remember}
      onClick={() => setRemember(!remember)}
     />
     {isAlert && <Alert severity="error">{alertMessage}</Alert>}
     <StyledButton variant="contained" onClick={handleSubmit}>
      <Typography>Sign in</Typography>
     </StyledButton>
     <StyledBoxLinks>
      <StyledLink to={"/"}>Forgot password?</StyledLink>
      <StyledLink to={"/register"}>Don't have an account? Sign up</StyledLink>
     </StyledBoxLinks>
    </StyledStack>
   </ValidationGroup>
   <StyledCopyright>Copyright &copy; Your Website, 2022</StyledCopyright>
  </StyledContainer>
 );
};

export default LoginPage;
