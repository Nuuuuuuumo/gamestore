import React, {ChangeEvent, useState} from "react";
import {Box, FormControl, IconButton, Paper, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

interface StyledImagePickerProps {
  register: any;
  name?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  setValue?: (name: string, value: any) => void;
  clearErrors?: (name: string) => void;
}

export const StyledImagePicker = ({
  register,
  name = "image",
  label = "Upload Game Cover Image",
  error = false,
  helperText,
  setValue,
  clearErrors,
}: StyledImagePickerProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  
  // Register the input with react-hook-form
  const {onChange, ref} = register(name);
  
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // If setValue is provided, update the form value
      if (setValue) {
        setValue(name, event.target.files);
        if (clearErrors) clearErrors(name);
      }
      
      // Make sure the onChange from register is called
      onChange(event);
    }
  };
  
  const clearImage = () => {
    setPreview(null);
    setFileName("");
    
    // Create a new empty FileList-like object
    const dataTransfer = new DataTransfer();
    
    // Reset the file input
    const fileInput = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
      
      // If setValue is provided, update the form value to empty
      if (setValue) {
        setValue(name, dataTransfer.files);
      }
    }
  };
  
  return (
    <FormControl fullWidth sx={{m: 2}} error={error}>
      <input
        ref={ref}
        accept="image/*"
        type="file"
        id={`image-upload-${name}`}
        name={name}
        style={{display: "none"}}
        onChange={handleImageChange}
      />
      
      {!preview ? (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            border: error ? "2px dashed #d32f2f" : "2px dashed #bdbdbd",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "background.default",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "action.hover",
              borderColor: error ? "#d32f2f" : "primary.main",
            },
          }}
          component="label"
          htmlFor={`image-upload-${name}`}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <CloudUploadIcon color={error ? "error" : "primary"} sx={{fontSize: 48, mb: 2}}/>
            <Typography variant="h6" color={error ? "error" : "primary"} gutterBottom>
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click or drag and drop an image here
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{mt: 1}}>
              Supports: JPG, PNG, GIF
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={3}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            border: error ? "1px solid #d32f2f" : "none",
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 1,
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "white",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                pl: 1,
                maxWidth: "70%",
              }}
            >
              {fileName}
            </Typography>
            <Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById(`image-upload-${name}`)?.click();
                }}
                sx={{color: "white"}}
              >
                <ImageIcon/>
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                sx={{color: "white"}}
              >
                <DeleteIcon/>
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}
      {helperText && (
        <Typography variant="caption" color="error" sx={{mt: 1, ml: 1}}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};