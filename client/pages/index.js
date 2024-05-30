import Link from "next/link";

const Landing = ({ tickets, currentUser }) => {
  const ticketList = (tickets?.data ?? []).map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });
  return currentUser ? (
    <div>
      <h1>Tickets</h1>
      {ticketList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{ticketList}</tbody>
        </table>
      ) : (
        <h3>No tickets available</h3>
      )}
    </div>
  ) : (
    <div>
      <h1>You are not signed in</h1>
      <a href="/auth/signin">Sign in</a>
    </div>
  );
};

Landing.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/tickets");
  return {
    tickets: data,
  };
};

export default Landing;
