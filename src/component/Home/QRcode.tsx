"use client";
import * as React from "react";
import QRCode from "react-qr-code";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Box, Button } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

function QRcodePanel(props: SimpleDialogProps) {
  const { onClose, open, url } = props;

  const onCopyClick = () => {
    navigator.clipboard.writeText(
      url.startsWith("/") ? window.location.origin + url : url
    );
    // Alert the copied text
    alert("Copied the text");
  };

  const onOpenClick = () => {
    window.open(url, "__blank");
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle borderBottom={1}>Share to Social Media</DialogTitle>

      <Box paddingX={4}>
        <Box display="flex" justifyContent="space-around" marginTop={2}>
          <Button variant="contained" color="primary" onClick={onCopyClick}>
            Copy
          </Button>
          <Button onClick={onOpenClick} variant="contained" color="success">
            Open
          </Button>
        </Box>
        <QRCode
          size={256}
          style={{
            background: "white",
            padding: "16px",
            height: "auto",
            maxWidth: "100%",
            width: "100%",
            margin: "30px 0",
          }}
          value={url.startsWith("/") ? window.location.origin + url : url}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </Dialog>
  );
}

export default QRcodePanel;
