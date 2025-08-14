import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import MentorContactCard from "./MentorContactCard";

function MentorDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
        {/* X button for exit the dialog */}
      <DialogTitle sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onClose}>X</Button>
      </DialogTitle>

      <DialogContent>
        <MentorContactCard />
      </DialogContent>
    </Dialog>
  );
}

export default MentorDialog;
