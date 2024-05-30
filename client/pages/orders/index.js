const Orders = ({ orders }) => {
  console.log("orders", orders);
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Orders;

Orders.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data.data };
};
