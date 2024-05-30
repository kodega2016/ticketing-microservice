import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: (res) => {
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await doRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      {errors && errors}
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input
          className="form-control"
          placeholder="Enter name..."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Price</label>
        <input
          className="form-control"
          placeholder="Enter price ..."
          name="price"
          onBlur={onBlur}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
