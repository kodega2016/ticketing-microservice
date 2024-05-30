const Ticketshow = ({ ticket }) => {
  return (
    <div>
      <h2>{ticket.title}</h2>
      <h4>Price: {ticket.price}</h4>
      <button className="btn btn-primary">Purchase</button>
    </div>
  );
};

Ticketshow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data.data };
};

export default Ticketshow;
