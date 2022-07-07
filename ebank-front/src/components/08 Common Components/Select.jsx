import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState("dollar");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Change currency</Button>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={handleChange}
                input={<OutlinedInput label="Currency" />}
              >
                <MenuItem value={"euro"}>EUR</MenuItem>
                <MenuItem value={"dollar"}>DOL</MenuItem>
                <MenuItem value={"ruble"}>RUB</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <button className="myBtn1" onClick={handleClose}>
            Cancel
          </button>
          <button className="myBtn1" onClick={handleClose}>
            Ok
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
