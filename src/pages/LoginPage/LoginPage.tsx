import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Typography } from "@mui/material";

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
 StyledTitle,
} from "../../components";

import LockIcon from "@mui/icons-material/LockOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

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
    return handleAlert();

   if (remember) {
    window.localStorage.setItem("user", JSON.stringify(data));
   } else {
    window.localStorage.setItem("user", "");
   }
   navigate("/");
   setUser(JSON.stringify(data));
  }
 };

 const handleAlert = () => {
  setIsAlert(true);
  setTimeout(() => {
   setIsAlert(false);
  }, 5000);
 };

 return (
  <StyledContainer>
   <StyledAvatar>
    <LockIcon />
   </StyledAvatar>
   <StyledTitle variant="h5">Sign in</StyledTitle>
   <StyledStack spacing={2}>
    <StyledInput
     label="Email Address*"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     fullWidth
    />
    <StyledInput
     label="Password*"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     fullWidth
    />
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
    {isAlert && <Alert severity="error">Email or password is incorrect</Alert>}
    <StyledButton variant="contained" onClick={handleSubmit}>
     <Typography>Sign in</Typography>
    </StyledButton>
    <StyledBoxLinks>
     <StyledLink to={"/"}>Forgot password?</StyledLink>
     <StyledLink to={"/register"}>Don't have an account? Sign up</StyledLink>
    </StyledBoxLinks>
   </StyledStack>
   <StyledCopyright>Copyright &copy; Your Website, 2022</StyledCopyright>
  </StyledContainer>
 );
};

export default LoginPage;
