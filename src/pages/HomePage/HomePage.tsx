import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";

import {
 StyledAvatar,
 StyledButton,
 StyledContainer,
 StyledStack,
 StyledTitle,
} from "../../components";

interface IProps {
 user: string;
}

const HomePage = ({ user }: IProps) => {
 const navigate = useNavigate();

 const handleSubmit = () => {
  window.localStorage.setItem("user", "");
  navigate("/login");
 };

 return (
  <StyledContainer>
   <StyledAvatar>
    <LockIcon />
   </StyledAvatar>
   <StyledTitle variant="h5">Hello!</StyledTitle>
   <StyledStack spacing={2}>
    <Typography> My email : {user ? JSON.parse(user)?.email : ""}</Typography>
    <Typography> My password : I will not say</Typography>
    <StyledButton variant="contained" onClick={handleSubmit}>
     <Typography>Log out</Typography>
    </StyledButton>
   </StyledStack>
  </StyledContainer>
 );
};

export default HomePage;
