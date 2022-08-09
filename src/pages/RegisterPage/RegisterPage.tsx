import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Grid, Typography } from "@mui/material"
import { Validate, ValidationGroup } from "mui-validate";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";

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
 StyledSuccesInput,
 StyledTitle,
} from "../../components";


import { validEmail, validPassword, validName } from "../../common/validation";

import { IUser } from "../../types/IUser";

const RegisterPage = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [alertMessage, setAlertMessage] = useState("");
 const [isAlert, setIsAlert] = useState(false);
 const [dataBase, setDataBase] = useState<IUser[]>([]);
 const [isEmailValid, setIsEmailValid] = useState(false);
 const [isPasswordValid, setIsPasswordValid] = useState(false);
 const [isFirstNameValid, setIsFirstNameValid] = useState(false);
 const [isLastNameValid, setIsLastNameValid] = useState(false);

 useEffect(() => {
  const localUser = window.localStorage.getItem("dataBase");
  if (localUser) setDataBase(JSON.parse(localUser));
 }, []);

 const navigate = useNavigate();

 const handleSubmit = () => {
  if (isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid) {
   const newUser = { email, password, firstName, lastName };

   if (dataBase.find((el) => el.email === newUser.email))
    return handleAlert("User already exists");

   window.localStorage.setItem(
    "dataBase",
    JSON.stringify([...dataBase, newUser]),
   );
   navigate("/login");
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
   <StyledTitle variant="h5">Sign up</StyledTitle>
   <ValidationGroup>
    <StyledStack spacing={2}>
     <Grid container spacing={2}>
      <Grid item xs={6}>
       <Validate
        regex={[validName, "Must be at least 3 characters."]}
        name={"First Name*"}
        after={(res) => {
         setIsFirstNameValid(res.valid);
        }}
       >
        {isFirstNameValid ? (
         <StyledSuccesInput
          label="First Name*"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
           setFirstName(e.target.value)
          }
          fullWidth
          autoFocus
         />
        ) : (
         <StyledInput
          label="First Name*"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
           setFirstName(e.target.value)
          }
          fullWidth
         />
        )}
       </Validate>
      </Grid>
      <Grid item xs={6}>
       <Validate
        regex={[validName, "Must be at least 3 characters."]}
        name={"Last Name*"}
        after={(res) => {
         setIsLastNameValid(res.valid);
        }}
       >
        {isLastNameValid ? (
         <StyledSuccesInput
          label="Last Name*"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
           setLastName(e.target.value)
          }
          fullWidth
          autoFocus
         />
        ) : (
         <StyledInput
          label="Last Name*"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
           setLastName(e.target.value)
          }
          fullWidth
         />
        )}
       </Validate>
      </Grid>
     </Grid>
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
      label="I want to receive inspiration, marketing promotions and updates via email"
     />
     {isAlert && <Alert severity="error">{alertMessage}</Alert>}
     <StyledButton variant="contained" onClick={handleSubmit}>
      <Typography>Sign up</Typography>
     </StyledButton>
     <StyledBoxEndLinks>
      <StyledLink to={"/login"}>Already have an account? Sign in</StyledLink>
     </StyledBoxEndLinks>
    </StyledStack>
   </ValidationGroup>
   <StyledCopyright>Copyright &copy; Your Website, 2022</StyledCopyright>
  </StyledContainer>
 );
};

export default RegisterPage;
