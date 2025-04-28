import { Product } from "../types/Product";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,  // Importing Grid from Material-UI
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ProductcardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onFavorite: (id: number) => void;
}

export const ProductCard = ({ product, onAdd, onFavorite }: ProductcardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4}> 
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardMedia
          component="img"
          height="200"  
          image={product.images?.[0]}
          alt={product.title}
          sx={{ objectFit: "cover" }}  
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description.slice(0, 60)}...
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {product.price} €
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={() => onFavorite(product.id)} color="error" size="small">
                {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onAdd(product)}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
