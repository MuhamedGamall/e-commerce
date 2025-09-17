import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

export function Banner({
  severity,
  title,
  messages = [],
}: {
  severity: "success" | "info" | "warning" | "error";
  title: string;
  messages: string[];
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (messages.length > 0) {
      setOpen(true);
    }
  }, [messages]);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          sx={{
            mb: 2,
            "& .MuiAlert-icon": {
              marginInlineEnd: "8px !important",
            },
            "& .MuiAlert-action": {
              padding: "4px 0 0 0  !important",
              "[dir='rtl'] &": {
                marginLeft: "-8px !important",
                marginRight: "auto !important",
              },
            },
          }}
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>{title}</AlertTitle>
          {
            <ul style={{ listStyleType: "disc", paddingInline: "16px" }}>
              {messages.map((message, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "8px", wordBreak: "break-word" }}
                >
                  {message}
                </li>
              ))}
            </ul>
          }
        </Alert>
      </Collapse>
    </Box>
  );
}
