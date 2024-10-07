import { NewProduct } from "@/state/api/productApi";
import Header from "@/app/(components)/Header";

import { useOrganization } from "@clerk/nextjs";
import React, { ChangeEvent, FormEvent, useState } from "react";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: NewProduct) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const { organization } = useOrganization();
  const organizationID = organization?.id;
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stockQuantity: 0,
    categoryId: "",
    description: "",
    reorderPoint: 0,
    organizationId: organizationID ? organizationID : "Null",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "organizationId" ||
        name === "price" ||
        name === "stockQuantity" ||
        name === "rating"
          ? value === ""
            ? ""
            : parseFloat(value) // Check for empty string
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* category */}
          <label htmlFor="categoryId" className={labelCssStyles}>
            category
          </label>
          <input
            type="text"
            name="categoryId"
            placeholder="Category"
            onChange={handleChange}
            value={formData.categoryId}
            className={inputCssStyles}
            required
          />

          {/* Description */}
          <label htmlFor="description" className={labelCssStyles}>
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className={inputCssStyles}
            required
          />

          {/* Reorder Point */}
          <label htmlFor="reorderPoint" className={labelCssStyles}>
            Reorder Point
          </label>
          <input
            type="number"
            name="reorderPoint"
            placeholder="Reorder Point"
            onChange={handleChange}
            value={formData.reorderPoint}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
