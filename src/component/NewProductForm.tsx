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
    <Box component="form" onSubmit={handleSubmit} display="flex"  gap={3}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="40%">
      {!images && (
          <InputLabel htmlFor="upload-image">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </InputLabel>
        )}
        <input
          accept="image/*"
          id="upload-image"
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <Box display="flex" gap={2} mt={2}>
          {images &&
            Array.from(images).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
        </Box>
      </Box>
      <Box width="60%" display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(+e.target.value)} 
        required
        fullWidth
      />
      <TextField
        label="Description"
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
        {submitting ? <CircularProgress size={24} color="inherit" /> : "Add to Cart"}
      </Button>
    </Box>
    </Box>
  );
};
