"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { UserPanelData } from "@/interface/ISubPanel";
import TrafficUsage from "@/component/Home/TrafficUsage";
import ConfigTable from "@/component/Home/ConfigTable";
import { convertTextToFloat } from "@/lib/utilities";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
  autocompleteClasses,
} from "@mui/material";
const SubPanel = ({
  params,
}: {
  params: { password: string; uuid: string };
}) => {
  const didFetchData = useRef(false);
  const [panelData, setPanelData] = useState<null | UserPanelData>();
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .post("/api/user/", {
          uuid: params.uuid,
          password: params.password,
        })
        .then((res) => {
          setPanelData(res.data);
        })
        .catch((err) => {
          console.log(`${err}`);
          setError({
            status: true,
            message: err.message,
          });
        });

      return result;
    };
    if (!didFetchData.current) {
      fetchData();
      didFetchData.current = true;
    }
  }, [params.password, params.uuid]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    if (panelData) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    const progressTimer = setTimeout(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100
          ? 100
          : Math.min(prevProgress + Math.random() * 5, 100)
      );
    }, 200);
    return () => clearTimeout(progressTimer);
  }, [progress, panelData, loading]);

  return (
    <main>
      {!loading && panelData && !error.status && (
        <div>
          <TrafficUsage
            current={convertTextToFloat(panelData.traffic.currentUsage)}
            max={convertTextToFloat(panelData.traffic.maxUsage)}
            expired={panelData.traffic.expired}
          />
          <ConfigTable data={panelData.configs.table} />
        </div>
      )}
      {loading && !error.status && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress size={70} variant="determinate" value={progress} />
          <Box
            sx={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              fontSize={16}
              color="text.secondary"
            >{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      )}
      {error.status && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Alert severity="error">{error.message}</Alert>
        </Box>
      )}
    </main>
  );
};

export default SubPanel;
