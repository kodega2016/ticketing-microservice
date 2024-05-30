import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("error:", error);
      setErrors(
        error && error.response.data.errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="my-0">
              {error.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )
      );
      throw error;
    }
  };

  return { doRequest, errors };
};
