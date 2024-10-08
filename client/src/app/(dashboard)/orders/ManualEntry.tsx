import React, { useState } from "react";
import { useCreateProductMutation } from "@/state/api";
import { TextField, Button } from "@mui/material";
import { Product, NewProduct } from "@/state/api";

interface ManualEntryProps {
  onAdd: (product: Product) => void;
}

const ManualEntry: React.FC<ManualEntryProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: NewProduct = {
      name,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
    };
    try {
      const createdProducts = await createProduct(newProduct).unwrap();
      if (Array.isArray(createdProducts) && createdProducts.length > 0) {
        onAdd(createdProducts[0]);
      } else if (!Array.isArray(createdProducts)) {
        onAdd(createdProducts);
      }
      setName("");
      setPrice("");
      setStockQuantity("");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Stock Quantity"
        type="number"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Custom Product
      </Button>
    </form>
  );
};

export default ManualEntry;
