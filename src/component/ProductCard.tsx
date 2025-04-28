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
    //<Grid item xs={12} sm={6} md={4}> 
      <Card sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.15)" },
    }}>
        <CardMedia
          component="img"
            
          image={product.images?.[0]}
          alt={product.title}
          sx={{ height:180,objectFit: "cover",width:"70%",borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px" ,flex:"2", marginLeft:"15%"}}  
        />
        <CardContent >
        <Typography gutterBottom variant="h6" component="div" noWrap>
                  {product.title}
        </Typography>
        <Typography
                  variant="body2"
                  color="text.secondary"
                  flexWrap="wrap"
                  sx={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '300px',
                      '&:hover': {
                          whiteSpace: 'normal',
                          overflow: 'visible',
                          textOverflow: 'clip',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                      },
                  }}>
            {product.description}...
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {product.price} €
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton onClick={() => onFavorite(product.id)} color="error" size="small" sx={{padding:"4px"}}>
                {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onAdd(product)}
                sx={{borderRadius:"8px",textTransform:"none"}}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    //</Grid>
  );
};
