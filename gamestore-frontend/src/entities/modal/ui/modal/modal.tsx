import React, {useState} from "react";
import {Box, Button, MenuItem, Modal, Select, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "@/shared/model/hooks";
import {closeModal} from "@/entities/modal/model/slice";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const {isOpen, modalType, modalProps} = useAppSelector((state) => state.modal);
  const [selectedFriend, setSelectedFriend] = useState("");
  
  if (!isOpen) return null;
  
  const handleClose = () => dispatch(closeModal());
  
  const handleConfirm = () => {
    if (modalType === "GIFT_GAMES" && selectedFriend) {
      modalProps?.onConfirm(selectedFriend);
    }
    handleClose();
  };
  
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyles}>
        {modalType === "GIFT_GAMES" && (
          <>
            <Typography variant="h6">{modalProps?.title || "Gift Games"}</Typography>
            <Typography variant="body1">Select a friend to send the games:</Typography>
            
            <Select
              fullWidth
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              sx={{mt: 2}}
            >
              {modalProps?.friends?.map((friend) => (
                <MenuItem key={friend.id} value={friend.id}>
                  {friend.firstName} {friend.lastName}
                </MenuItem>
              ))}
            </Select>
            
            <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                color="primary"
                variant="contained"
                sx={{ml: 2}}
                disabled={!selectedFriend}
              >
                Confirm
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

