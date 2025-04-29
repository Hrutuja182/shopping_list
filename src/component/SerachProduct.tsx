import React from "react";
import { Product } from "../types/Product";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { deleteProduct } from "../services/api";

interface SearchProductProps {
  product: Product;
  onAdd: (product: Product) => void;
  onFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

export const SearchProduct = ({
    product,
    onAdd,
    onFavorite,
    onDelete,
  }: SearchProductProps) => {
     const handleRemove = async (id: number) => {
            try {
                await deleteProduct(id);
                onDelete(id);
                
            } catch (error) {
                alert('Failed to remove item. Please try again later.');
            }
        };
    return (
        
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: 2,
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.images?.[0]}
          alt={product.title}
          sx={{
            width: 100,
            height: 100,
            borderRadius: "8px",
            objectFit: "contain",
            mr: 2,
          }}
        />
        <CardContent sx={{ flex: 1, padding: "0 !important" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography variant="subtitle2" fontWeight="medium">
              {product.price} €
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {product.brand}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={2}>
            {/*<IconButton onClick={() => onAdd(product)} size="small" color="primary">
              <AddIcon />
            </IconButton>*/}
            <IconButton onClick={() => onFavorite(product.id)} size="small" color="error">
              {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={() => handleRemove(product.id)} size="small" color="default">
              <DeleteIcon />
            </IconButton>
            <Button
              onClick={() => onAdd(product)}
              variant="outlined"
              size="small"
              sx={{ borderRadius: "8px", textTransform: "none", ml: "auto" }}
            >
              Add to list
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
