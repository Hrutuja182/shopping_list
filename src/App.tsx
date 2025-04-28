import { useEffect, useState } from "react";
import { fetchProducts, searchProducts } from "./services/api";
import { Product } from "./types/Product";
import { ProductCard } from "./component/ProductCard";
import { CartItem } from "./component/CartItem";
import { NewProductForm } from "./component/NewProductForm";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  Pagination,
} from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuantityChange = (id: number, amount: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
          : item
      )
    );
  };

  const handleFavoriteToggle = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, favorite: !product.favorite }
          : product
      )
    );
  };

  const handleAddNewProduct = (product: Product) => {
    setProducts([product, ...products]);
    setShowNewProductForm(false);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      await loadProducts();
    } else {
      try {
        const searchResult = await searchProducts(value);
        setProducts(searchResult);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box p={4} display="flex" gap={4} bgcolor="#f4f4f8" minHeight="100vh"  justifyContent="center">
      {/* Products List */}
      <Box maxWidth="1200px" width="100%" display="flex" gap={4}>
      <Box flex={1}>
        <Box display="flex" gap={2} mb={3} alignItems="center">
          <TextField
            fullWidth
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            variant="outlined"
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
           }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            sx={{ borderRadius: "8px", textTransform: "none", height: "50px" }}
          >
            {showNewProductForm ? "Cancel" : "Add New Product"}
          </Button>
        </Box>

        {showNewProductForm && (
          <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
            <NewProductForm onAddProduct={handleAddNewProduct} />
          </Paper>
        )}
          
          <Divider sx={{ mb: 2 }} />
          
        <Grid container spacing={3}>
          {currentProducts.map((product) => (
             <Box item xs={12} sm={6} key={product.id}>
              <ProductCard
                product={product}
                onAdd={handleAddToCart}
                onFavorite={handleFavoriteToggle}
              />
              </Box>
           
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
      

      {/* Cart Section */}
      <Paper elevation={3} sx={{ width: 350, padding: 3 ,borderRadius: "12px",
          bgcolor: "#fff",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: "20px",
          height: "fit-content",}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" mb={2}>My Product</Typography>
          <Button variant="text" color="error" size="small" onClick={handleClearCart}>
            Delete All
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveFromCart}
            onQantitychange={handleQuantityChange} 
          />
        ))}

        <Divider sx={{ my: 2 }} />

        <Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">{subtotal.toFixed(2)} €</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">Shipping</Typography>
            <Typography variant="body2">
              {shipping ? `${shipping} €` : "Free"}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            fontWeight="bold"
            mt={2}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{total.toFixed(2)} €</Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3 }}
        >
          Confirm Order
        </Button>
      </Paper>
      </Box>
    </Box>
  );
}

export default App;
