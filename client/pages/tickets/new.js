import { useState } from "react";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(title, price);
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
