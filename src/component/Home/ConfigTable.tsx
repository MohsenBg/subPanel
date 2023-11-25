"use client";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Box, Button } from "@mui/material";
import QRcodePanel from "./QRcode";

interface props {
  data: {
    name: string;
    type: string;
    domain: string;
    protocol: string;
    transport: string;
    security: string;
    link: string;
  }[];
}
const ConfigTable = ({ data }: props) => {
  const [openQRcodePanel, setOpenQRcodePanel] = useState(false);
  const [qrCodeUrl, SetQrCodeUrl] = useState("");

  if (!data) {
    return null;
  }

  const closePanel = () => {
    setOpenQRcodePanel(false);
  };

  const openPanel = (url: string) => {
    setOpenQRcodePanel(true);
    SetQrCodeUrl(url);
  };

  return (
    <Box padding={2}>
      <QRcodePanel
        open={openQRcodePanel}
        url={qrCodeUrl}
        onClose={closePanel}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">type</TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                domain
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                protocol
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                transport
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", lg: "table-cell" } }}
              >
                security
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                  >
                    <Button
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                      onClick={() => openPanel(row.link)}
                    >
                      <QrCodeIcon />
                    </Button>
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {row.domain}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {row.protocol}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  {row.transport}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", lg: "table-cell" } }}
                >
                  {row.security}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConfigTable;
