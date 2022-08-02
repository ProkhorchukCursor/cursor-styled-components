import styled from "@emotion/styled";

import { TextField } from "@mui/material";

const StyledInput = styled(TextField)({
 color: "white",
 "& label.Mui-focused": {
  color: "grey",
 },
 "& label": {
  color: "grey",
 },
 "& .MuiOutlinedInput-root": {
  "& fieldset": {
   borderColor: "grey",
  },
  "&:hover fieldset": {
   borderColor: "grey",
  },
  "&.Mui-focused fieldset": {
   borderColor: "grey",
  },
  "& input": {
   color: "grey",
  },
 },
});

export default StyledInput;
