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
              (p) => p.productId === e.target.value
            );
            if (product) onSelect(product);
          }}
        >
          <MenuItem value="">Select a product</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.productId} value={product.productId}>
              {product.name} (ID: {product.productId})
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default ProductSearch;
