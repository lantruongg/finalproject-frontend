import React, { useEffect, useState } from "react";
import { getOrders } from "../../api";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllOrders = async () => {
      const result = await getOrders();
      setOrders(result.data);
    };
    getAllOrders();
  }, []);
  return (
    <table className="table" style={{ marginTop: 100 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
            <td>
              {order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}
            </td>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/order/${order._id}`);
              }}
            >
              Details
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
