import { Product } from "../types/Product";
import { MdDelete } from 'react-icons/md'; 
import { deleteProduct } from "../services/api";
import { Snackbar } from "@mui/material";
import { Button, IconButton, Typography, Box, Divider } from "@mui/material";
import { useState } from "react";
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
        <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
           <Box>
            < Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="textSecondary">{item.price}</Typography>
            </Box> 
            <Box display="flex" alignItems="center" gap={2}>
                <Button variant="outlined"  onClick={()=>onQantitychange(item.id,-1)}>-</Button>
                <Typography variant="body1">{item.quantity}</Typography>
                <Button variant="outlined"  onClick={()=>onQantitychange(item.id,1)}>+</Button>
                <IconButton onClick={()=>handleRemove(item.id)}> <MdDelete size={20} /></IconButton>
            </Box>

        </Box>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Item removed successfully"
        onClose={() => setOpenSnackbar(false)}
      />
      </>
    )
}