import { useState, useEffect, useCallback } from 'react';
import { useCreateSaleMutation } from "@/state/api";
import { Product, SaleProduct, Sale } from '@/state/api';

export const useSalesUpdate = () => {
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [message, setMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [createSale] = useCreateSaleMutation();

  const addProduct = useCallback((product: Product) => {
    setProducts(prevProducts => [...prevProducts, { ...product, quantity: 1 }]);
  }, []);

  const removeProduct = useCallback((index: number) => {
    setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = { ...updatedProducts[index], quantity };
      return updatedProducts;
    });
  }, []);

  const calculateTotal = useCallback(() => {
    const newTotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [products]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  const handleSubmit = useCallback(async () => {
    try {
      const sales: Sale[] = products.map(product => ({
        productId: product.id,
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
  }, [products, total, createSale]);

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