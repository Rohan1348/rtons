import React from "react";
import { Order } from "../types/types";

const OrderList: React.FC<{
  onSelectOrder: (order: Order) => void;
  orders: Order[];
}> = ({ onSelectOrder, orders }) => {

  return (
    <div className="orders-container">
      <h2 className="orders-heading">Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">No Orders</p>
      ) : (
        ""
      )}
      <ul className="orders-list">
        {orders.map((order) => (
          <li
            key={order._id}
            className="order-item"
            onClick={() => onSelectOrder(order)}
          >
            {order.customerName} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
