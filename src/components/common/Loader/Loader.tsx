import { Box, CircularProgress } from "@mui/material";

const Loader = ({
  loading,
  hasLoader = true,
  sx,
}: {
  loading?: boolean;
  hasLoader?: boolean;
  sx?: object;
}) => {
  if (!loading) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 2,
        backgroundColor: "#192a5628",
        top: 0,
        left: 0,
        ...sx,
      }}
      
    >
      {hasLoader && <CircularProgress sx={{ color: "#192A56" }} size={30} />}
    </Box>
  );
};

export default Loader;
