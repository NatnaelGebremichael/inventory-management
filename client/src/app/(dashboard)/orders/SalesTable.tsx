import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { SaleProduct } from "@/state/api";

interface SalesTableProps {
  products: SaleProduct[];
  updateQuantity: (index: number, quantity: number) => void;
  removeProduct: (index: number) => void;
}

const SalesTable: React.FC<SalesTableProps> = ({
  products,
  updateQuantity,
  removeProduct,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Subtotal</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <TextField
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  updateQuantity(index, parseInt(e.target.value))
                }
                inputProps={{ min: "1", max: product.stockQuantity.toString() }}
              />
            </TableCell>
            <TableCell>
              ${(product.price * product.quantity).toFixed(2)}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => removeProduct(index)}>
                <Trash2 />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
