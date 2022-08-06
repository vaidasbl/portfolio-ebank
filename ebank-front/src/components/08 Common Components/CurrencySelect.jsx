import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../Reducers/user";
import apiEndpoint from "../../endpoint";

const CurrencySelect = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("");

  const handleSave = async () => {
    const request = {
      username: user.username,
      currency: currency,
    };

    if (currency !== "") {
      try {
        const result = await axios.put(
          `${apiEndpoint}/api/bank/users/changecurrency`,
          request
        );

        dispatch(updateWallet({ wallet: result.data }));

        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

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
      <button className="myBtn5" onClick={handleClickOpen}>
        Change currency
      </button>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <Box component="form">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={handleChange}
                input={<OutlinedInput label="Currency" />}
              >
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"RUB"}>RUB</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <div className="row">
            <div className="col-6">
              <button className="myBtn6" onClick={handleClose}>
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button className="myBtn6" onClick={handleSave}>
                Ok
              </button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrencySelect;
