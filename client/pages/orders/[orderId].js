import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
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

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      console.log("payment", payment);
    },
  });

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order Status: {order.status}</p>
      {order.status === "complete" && <p>Order Paid</p>}
      {order.status === "created" && (
        <p>
          Time left to pay:{" "}
          {timeLeft > 0 ? `${timeLeft} seconds` : "Order Expired"}
        </p>
      )}
      <p>Order ID: {order.id}</p>
      <p>Order Ticket ID: {order.ticket.id}</p>
      <p>Order Ticket Title: {order.ticket.title}</p>
      <p>Order Ticket Price: {order.ticket.price}</p>
      {timeLeft > 0 && order.status === "created" && (
        <StripeCheckout
          amount={order.ticket.price * 100}
          email={currentUser.email}
          token={async ({ id }) => {
            await doRequest({ token: id });
          }}
          stripeKey="pk_test_51NvUDuG1jivoiAUMZ27YY6DebshIaXANkYbM8OlMhOC0YtFZdpZ512pcrDqMOAKYZZfaoUmISRLy8lGOEYLiEWGi00ctGq0wnD"
        />
      )}
    </div>
  );
};

export default OrderShow;

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data.data };
};
