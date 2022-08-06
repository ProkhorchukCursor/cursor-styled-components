import styled from "@emotion/styled";

import { TextField } from "@mui/material";

const StyledInput = styled(TextField)({
 "& label.Mui-focused": {
  color: "green",
 },
 "& label": {
  color: "green",
 },
 "& .MuiOutlinedInput-root": {
  "& fieldset": {
   borderColor: "green",
  },
  "&:hover fieldset": {
   borderColor: "green",
  },
  "&.Mui-focused fieldset": {
   borderColor: "green",
  },
  "& input": {
   color: "green",
  },
 },
});

export default StyledInput;
