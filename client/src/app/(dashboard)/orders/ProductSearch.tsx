import React, { useState } from "react";
import { useGetProductsQuery } from "@/state/api";
import { TextField, Select, MenuItem } from "@mui/material";
import { Search } from "lucide-react";
import { Product } from "@/state/api";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const { data: products, isLoading, isError } = useGetProductsQuery(search);

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        InputProps={{
          startAdornment: <Search size={20} />,
        }}
      />
      {!isLoading && !isError && products && (
        <Select
          fullWidth
          onChange={(e) => {
            const product = products.find(
              (p) => p.id === e.target.value
            );
            if (product) onSelect(product);
          }}
        >
          <MenuItem value="">Select a product</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default ProductSearch;
