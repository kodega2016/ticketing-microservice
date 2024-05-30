import { useState, useEffect } from "react";

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [order]);

  return (
    <div>
      <h1>Order Details</h1>
      <p>
        Time left to pay:{" "}
        {timeLeft > 0 ? `${timeLeft} seconds` : "Order Expired"}
      </p>
      <p>Order Status: {order.status}</p>
      <p>Order ID: {order.id}</p>
      <p>Order Ticket ID: {order.ticket.id}</p>
      <p>Order Ticket Title: {order.ticket.title}</p>
      <p>Order Ticket Price: {order.ticket.price}</p>
    </div>
  );
};

export default OrderShow;

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data.data };
};
