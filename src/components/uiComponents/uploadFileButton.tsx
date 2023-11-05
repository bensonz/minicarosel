import React from "react";
import { Button } from "@mui/material";

interface FileUploadProps {
  text?: string;
  accept: string;
  onUpload: (file: File) => void;
}

const UploadFileButton: React.FC<FileUploadProps> = ({
  text,
  accept,
  onUpload,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input
        name="upload-file"
        id="contained-button-file"
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          {text || "Upload"}
        </Button>
      </label>
    </div>
  );
};

export default UploadFileButton;
