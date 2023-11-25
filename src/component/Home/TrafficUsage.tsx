"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Paper } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

interface Props {
  current: number;
  max: number;
  expired: string;
}
export default function TrafficUsage(props: Props) {
  const { current, max, expired } = props;

  return (
    <Box padding={3} mb={2}>
      <Paper elevation={10} square={false} sx={{ padding: "20px" }}>
        <h1>Traffic Usage</h1>
        <Box px={1} py={2}>
          {current}GB <b>Of</b> {max}GB
        </Box>

        <BorderLinearProgress
          variant="determinate"
          value={(current / max) * 100}
        />
        <Box px={1} py={2}>
          Expired: {expired}
        </Box>
      </Paper>
    </Box>
  );
}
