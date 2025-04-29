import { Product } from "../types/Product";
import { MdDelete } from 'react-icons/md'; 
import { deleteProduct } from "../services/api";
import { Snackbar } from "@mui/material";
import { Button, IconButton, Typography, Box, Divider } from "@mui/material";
import { useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
interface CartItemProps{
    item:Product ;
    onRemove: (id :number)=>void;
    onQantitychange:(id : number, amount:number)=>void;

}

export const CartItem =({ item,onRemove,onQantitychange}:CartItemProps)=>{
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleRemove = async (id: number) => {
        try {
            await deleteProduct(id);
            onRemove(id);
            setOpenSnackbar(true);
        } catch (error) {
            alert('Failed to remove item. Please try again later.');
        }
    };
    return(
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" py={2} px={1}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Box
                        component="img"
                        src={item.images}
                        alt={item.title}
                        sx={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 1 }}
                    />
                    <Box sx={{ maxWidth: 160 }}>
                        <Typography variant="body2" fontWeight={500} flexWrap="wrap">
                            {item.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            €{item.price}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    {item.favorite ? (
                        <FaHeart color="red" size={16} />
                    ) : (
                        <FaRegHeart color="grey" size={16} />
                    )}
                    <Button size="small" variant="outlined" onClick={() => onQantitychange(item.id, -1)}>-</Button>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <Button size="small" variant="outlined" onClick={() => onQantitychange(item.id, 1)}>+</Button>
                    <IconButton size="small" onClick={() => handleRemove(item.id)}>
                        <MdDelete size={18} />
                    </IconButton>
                </Box>
            </Box>

      </>
    )
}