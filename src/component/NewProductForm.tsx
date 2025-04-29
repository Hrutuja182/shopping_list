import { useState } from "react";
import { Product } from "../types/Product";
import { addProduct } from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,InputLabel,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

interface NewProductFormsProps {
  onAddProduct: (product: Product) => void;
}

export const NewProductForm = ({ onAddProduct }: NewProductFormsProps) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ images,setImages]=useState<FileList| null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!images) {
        setError("Please upload at least one image.");
        return;
      }
    const newProduct = {
      title,
      brand,
      price,
      description,
      //images: [],
      images: Array.from(images).map((file) => URL.createObjectURL(file)),
    };
    try {
      setSubmitting(true);
      setError(null);
      const addedProduct = await addProduct(newProduct);
      onAddProduct(addedProduct);
      setTitle("");
      setBrand("");
      setPrice(0);
      setDescription("");
      setImages(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    display="flex"
    flexWrap="wrap"
    gap={3}
    sx={{
      backgroundColor: "#f7f7fb",
      p: 4,
      borderRadius: "16px",
      maxWidth: 900,
      mx: "auto"
    }}
  >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      maxWidth={240}
      height={240}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "12px",
        backgroundColor: "#f1f1f6",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {!images && (
        <Box textAlign="center">
          <InputLabel htmlFor="upload-image" sx={{ cursor: "pointer" }}>
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              Add image
            </Typography>
          </InputLabel>
        </Box>
      )}
      <input
        accept="image/*"
        id="upload-image"
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
  
    
      {images && (
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          p={1}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "#fff"
          }}
        >
          {Array.from(images).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  
    <Box flex={1} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Title"
        variant="filled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Brand"
        variant="filled"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Price"
        type="number"
        variant="filled"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
        fullWidth
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        fullWidth
        sx={{ height: 50 }}
      >
        {submitting ? <CircularProgress size={24} color="inherit" /> : "Add new product"}
      </Button>
    </Box>
  </Box>
  
  );
};
