import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useRef } from "react";
import { Box, FormHelperText, Typography } from "@mui/material";
import { Image } from "./Image";
import { useT } from "../../hooks";

export type FileUploadProps = {
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  onFilesSelected?: (files: File[] | File | undefined) => void;
  contentLabel?: string;
  uploadIcon?: string;
  uploadedIcon: string;
  name?: string;
  id?: string;
  initialValues?: File | any;
};

const Dropzone = ({
  accept = {
    "application/*": [],
  },
  maxFiles = 1,
  onFilesSelected,
  contentLabel,
  uploadIcon,
  uploadedIcon,
  name = "file",
  id,
  initialValues,
}: FileUploadProps) => {
  const t = useT("Common.DropzoneField");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && onFilesSelected) {
        onFilesSelected([]);
        if (maxFiles === 1) {
          onFilesSelected(acceptedFiles[0]);
        } else {
          onFilesSelected(acceptedFiles);
        }
      }
    },
    [onFilesSelected, maxFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept,
    multiple: maxFiles > 1,
    maxFiles,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (fileRejections.length > 0 && onFilesSelected) {
      if (maxFiles === 1) {
        inputRef.current!.value = "";
        onFilesSelected(undefined);
      } else {
        onFilesSelected([]);
      }
    }
  }, [fileRejections, maxFiles, onFilesSelected]);

  const updateInitialValues = {
    name: initialValues?.attachmentName || initialValues?.name,
  };

  const displayedFile = acceptedFiles[0] || updateInitialValues;

  return (
    <Box
      {...getRootProps({ onClick: handleClick })}
      sx={{
        borderRadius: "8px",
        padding: "24px",
        textAlign: "center",
        cursor: "pointer",
        background: isDragActive ? "#f0f0f0" : "#FBFBFB",
        transition: "background-color 0.2s",
        border: "0.8px dashed #A9ABAC",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <input {...getInputProps()} ref={inputRef} name={name} id={id} />

      {displayedFile.name && fileRejections?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Image
            src={uploadedIcon}
            alt="uploaded-icon"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Typography variant="body2" sx={{ color: "#666666" }}>
            {displayedFile.name}
          </Typography>
        </div>
      ) : (
        <>
          {uploadIcon && (
            <Image
              src={uploadIcon}
              alt="upload-icon"
              width={49}
              height={49}
            />
          )}
          <Typography variant="body2" mt={1} sx={{ color: "#666666" }}>
            {isDragActive ? t("DropHere") : contentLabel || t("ContentLabel")}
          </Typography>
        </>
      )}

      {fileRejections.length > 0 && (
        <FormHelperText
          variant="filled"
          error={fileRejections.length > 0}
          sx={{ color: "#DC362E", textAlign: "center" }}
        >
          {t("Rejected", {
            max: maxFiles,
            fileLabel: maxFiles > 1 ? "files" : "file",
            formats: Object.values(accept).join(", "),
          })}
        </FormHelperText>
      )}
    </Box>
  );
};

export default Dropzone;
