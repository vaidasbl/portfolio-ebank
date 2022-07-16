import React from "react";

const ContactAddComponent = ({ contactUsername, handleChange, handleAdd }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        className="my-form"
        value={contactUsername}
        onChange={handleChange}
      />

      <div>
        <button
          disabled={!contactUsername}
          type="button"
          className="myBtn4 mt-2"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ContactAddComponent;
