import useRequest from "../../hooks/use-request";

const Ticketshow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => {
      console.log(order);
    },
  });

  return (
    <div>
      <h2>{ticket.title}</h2>
      <h4>Price: {ticket.price}</h4>
      <button className="btn btn-primary" onClick={doRequest}>
        Purchase
      </button>
      {errors && errors}
    </div>
  );
};

Ticketshow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data.data };
};

export default Ticketshow;
