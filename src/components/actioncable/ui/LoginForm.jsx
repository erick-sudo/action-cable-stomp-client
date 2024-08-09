import React, { useState } from "react";

function LoginForm({ onSubmit, className }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className={`${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="grid gap-2"
      >
        <div className="grid gap-1">
          <label htmlFor="username">Username</label>
          <input
            required
            name="username"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg"
            type="text"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg"
            type="password"
          />
        </div>
        <input
          value="Submit"
          type="submit"
          className="bg-black text-white rounded-lg py-2 px-4 mt-4"
        />
      </form>
    </div>
  );
}

export default LoginForm;
