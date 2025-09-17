import { useState, useEffect } from "react";
import instance from "../../interceptors/axios";
import { Banner } from "../common";
import { Box } from "@mui/material";

export const GenericErrorMsg = ({
  title,
  loading,
  messages = [],
}: {
  title: string;
  loading: boolean;
  messages?: string[];
}) => {
  const [errorMsg, setErrorMsg] = useState<string[]>([]);

  instance.interceptors.response.use(
    (response) => {
      setErrorMsg([]);
      return response;
    },
    (err: any) => {
      const { response } = err;
      const errors: any = response?.data;
      setErrorMsg(
        Array.from(new Set(Object.entries(errors).map(([_, v]) => String(v))))
      );
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    if (messages.length > 0) {
      setErrorMsg(messages);
    }
  }, [messages]);

  const shouldShow = errorMsg.length > 0 && !loading;
  return (
    <Box
      sx={{
        opacity: shouldShow ? 1 : 0,
        overflow: "auto",
        maxHeight: "250px",
        height: shouldShow ? "100%" : "0 !important",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Banner severity="error" title={title} messages={errorMsg} />
    </Box>
  );
};
