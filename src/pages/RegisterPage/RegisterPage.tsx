import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Grid, Typography } from "@mui/material";

import {
 StyledAvatar,
 StyledBoxEndLinks,
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

const RegisterPage = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [isAlert, setIsAlert] = useState(false);
 const [dataBase, setDataBase] = useState<IUser[]>([]);

 useEffect(() => {
  const localUser = window.localStorage.getItem("dataBase");
  if (localUser) setDataBase(JSON.parse(localUser));
 }, []);

 const navigate = useNavigate();

 const handleSubmit = () => {
  if (email && password && firstName && lastName) {
   const newUser = { email, password, firstName, lastName };

   if (dataBase.find((el) => el.email === newUser.email)) return handleAlert();

   window.localStorage.setItem(
    "dataBase",
    JSON.stringify([...dataBase, newUser]),
   );
   navigate("/login");
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
   <StyledTitle variant="h5">Sign up</StyledTitle>
   <StyledStack spacing={2}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <StyledInput
       label="First Name*"
       value={firstName}
       onChange={(e) => setFirstName(e.target.value)}
       fullWidth
      />
     </Grid>
     <Grid item xs={6}>
      <StyledInput
       label="Last Name*"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}
       fullWidth
      />
     </Grid>
    </Grid>
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
     label="I want to receive inspiration, marketing promotions and updates via email"
    />
    {isAlert && <Alert severity="error">User already exists</Alert>}
    <StyledButton variant="contained" onClick={handleSubmit}>
     <Typography>Sign up</Typography>
    </StyledButton>
    <StyledBoxEndLinks>
     <StyledLink to={"/login"}>Already have an account? Sign in</StyledLink>
    </StyledBoxEndLinks>
   </StyledStack>
   <StyledCopyright>Copyright &copy; Your Website, 2022</StyledCopyright>
  </StyledContainer>
 );
};

export default RegisterPage;
