"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AlertCircle, PlusCircle } from "lucide-react";
import ProductSearch from "./ProductSearch";
import BarcodeScanner from "./BarcodeScanner";
import ManualEntry from "./ManualEntry";
import SalesTable from "./SalesTable";
import { useSalesUpdate } from "./useSalesUpdate";

export default function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    products,
    message,
    total,
    addProduct,
    removeProduct,
    updateQuantity,
    handleSubmit,
    setMessage,
  } = useSalesUpdate();

  return (
    <div className="mx-auto pb-5 w-full">
      <Card>
        <CardHeader title="Update Sales" />
        <CardContent>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <ProductSearch onSelect={addProduct} />
            <BarcodeScanner onScan={addProduct} />
            <Button
              onClick={() => setIsModalOpen(true)}
              startIcon={<PlusCircle />}
            >
              Manual Entry
            </Button>
          </div>
          <SalesTable
            products={products}
            updateQuantity={updateQuantity}
            removeProduct={removeProduct}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Update Sales
            </Button>
          </div>
          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AlertCircle style={{ marginRight: "10px" }} />
              {message}
            </div>
          )}
        </CardContent>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>Add Custom Product</DialogTitle>
          <DialogContent>
            <ManualEntry
              onAdd={(product) => {
                addProduct(product);
                setIsModalOpen(false);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
