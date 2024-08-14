import React, { useState } from "react";
import { createOrder } from "../services/api";

const OrderCreation: React.FC<{ username: String; onOrderCreated: () => void; }> = ({ username, onOrderCreated }) => {
  const [items, setItems] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const itemsArray = items.split(",").map((item) => item.trim());
      await createOrder(username, itemsArray, totalAmount);
      setMessage("Order created successfully");
      // Reset form
      setItems("");
      setTotalAmount(0);
      onOrderCreated();
    } catch (error) {
      setMessage("Failed to create order");
    }
  };

  return (
    <div className="order-creation-container">
      <h2 className="order-creation-title">Create a New Order</h2>
      <form className="order-creation-form" onSubmit={handleSubmit}>
        <input
          className="order-creation-input"
          type="text"
          placeholder="Items (comma-separated)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
        <input
          className="order-creation-input"
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          required
          min={1}
          max={10000}
        />
        <button className="order-creation-button" type="submit">
          Create Order
        </button>
      </form>
      {message && <p className="order-creation-message">{message}</p>}
    </div>
  );
};

export default OrderCreation;
