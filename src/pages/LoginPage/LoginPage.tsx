import React, { useState } from "react";

import { Typography } from "@mui/material";

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

interface IProps {
 setUser: (user: string) => void;
}

const LoginPage = ({ setUser }: IProps) => {
 const [emeil, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [remember, setRemember] = useState(false);

 const handleSubmit = () => {
  if (remember) {
   window.localStorage.setItem("user", JSON.stringify({ emeil, password }));
  } else {
   window.localStorage.setItem("user", "");
  }

  setUser(JSON.stringify({ emeil, password }));
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
     value={emeil}
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
