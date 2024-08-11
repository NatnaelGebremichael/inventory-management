"use client";

import React, { useState } from "react";
import Barcode from "react-barcode";
import { useGetProductsQuery } from "@/state/api";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Search, Printer } from "lucide-react";

interface Product {
  productId: string;
  name: string;
  price: number;
}

function  BarcodeGenerator () {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading, isError } = useGetProductsQuery(search);

  const handlePrint = () => {
    const printContent = document.getElementById("printableBarcode");
    if (!printContent) return;

    const windowPrint = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    if (!windowPrint) {
      alert("Please allow popups for this website");
      return;
    }

    windowPrint.document.write(printContent.innerHTML);
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  };

  return (
    <div className="mx-auto pb-5 w-full">
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardHeader title="Product Barcode Generator" />
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            InputProps={{
              startAdornment: <Search size={20} />,
            }}
            sx={{ mb: 2 }}
          />

          {!isLoading && !isError && products && products.length > 0 && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select a product</InputLabel>
              <Select
                value={selectedProduct ? selectedProduct.productId : ""}
                onChange={(e) => {
                  const selected = products.find(
                    (p) => p.productId === e.target.value
                  );
                  setSelectedProduct(selected || null);
                }}
                label="Select a product"
              >
                {products.map((product: Product) => (
                  <MenuItem key={product.productId} value={product.productId}>
                    {product.name} (ID: {product.productId})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {selectedProduct && (
            <div
              id="printableBarcode"
              style={{ textAlign: "center", marginBottom: 16 }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {selectedProduct.name}
              </h3>
              <p>Price: ${selectedProduct.price.toFixed(2)}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Barcode value={selectedProduct.productId.toString()} />
              </div>
            </div>
          )}

          {selectedProduct && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePrint}
              startIcon={<Printer size={20} />}
            >
              Print Barcode
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeGenerator;
