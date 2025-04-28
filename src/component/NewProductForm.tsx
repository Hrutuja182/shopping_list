import { useState } from "react";
import { Product } from "../types/Product";
import { addProduct } from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      brand,
      price,
      description,
      images: [],
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
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
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
  );
};
