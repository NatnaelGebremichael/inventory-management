import { useState, useEffect } from 'react';
import { useCreateSaleMutation } from "@/state/api";
import { Product } from '@/state/api';
import { SaleProduct, Sale } from './salesTypes';


export const useSalesUpdate = () => {
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [message, setMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [createSale] = useCreateSaleMutation();

  useEffect(() => {
    calculateTotal();
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, quantity: 1 }]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = quantity;
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const newTotal = products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  };

  const handleSubmit = async () => {
    try {
      const sales: Sale[] = products.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        unitPrice: product.price,
        totalAmount: product.price * product.quantity
      }));

      await createSale(sales).unwrap();

      setMessage(`Updated sales for ${products.length} products. Total amount: $${total}`);
      setProducts([]);
    } catch (error) {
      setMessage('Error updating sales. Please try again.');
    }
  };

  return {
    products,
    message,
    total,
    addProduct,
    removeProduct,
    updateQuantity,
    handleSubmit,
    setMessage
  };
};