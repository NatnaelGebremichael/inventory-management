"use client";

import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { Barcode } from "lucide-react";
import { useZxing } from "react-zxing";
import { useGetProductsQuery } from "@/state/api";
import { Product } from "@/state/api";

interface BarcodeScannerProps {
  onScan: (product: Product) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const { data: products } = useGetProductsQuery();

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedCode = result.getText();
      const scannedProduct = products?.find((p) => p.id === scannedCode);
      if (scannedProduct) {
        onScan(scannedProduct);
        setIsScanning(false);
      } else {
        console.log("Product not found");
        // You might want to show an error message to the user here
      }
    },
  });

  return (
    <>
      <Button onClick={() => setIsScanning(true)} startIcon={<Barcode />}>
        Scan Barcode
      </Button>
      <Dialog open={isScanning} onClose={() => setIsScanning(false)}>
        <DialogContent>
          <video ref={ref} style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsScanning(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BarcodeScanner;
