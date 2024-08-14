import React from "react";
import { Order } from "../types/types";
import { updateOrder, deleteOrder } from "../services/api";

const OrderDetails: React.FC<{
  order: Order;
  onUpdate: () => void;
  onDelete: () => void; }> = ({ order, onUpdate, onDelete }) => {
    
  const handleStatusChange = async (status: string) => {
    await updateOrder(order._id, { status });
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteOrder(order._id);
    onDelete();
  };

  return (
    <div className="order-details-container">
      <h3 className="order-details-heading">Order Details</h3>
      <p className="order-details-text">Customer: {order.customerName}</p>
      <p className="order-details-text">Items: {order.items.join(", ")}</p>
      <p className="order-details-text">Total: ₹{order.totalAmount}</p>
      <p className="order-details-text">Status: {order.status}</p>
      <div className="order-details-buttons">
        <button
          className="order-button process-button"
          onClick={() => handleStatusChange("Processing")}
        >
          Mark as Processing
        </button>
        <button
          className="order-button complete-button"
          onClick={() => handleStatusChange("Completed")}
        >
          Mark as Completed
        </button>
        <button className="order-button delete-button" onClick={handleDelete}>
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
