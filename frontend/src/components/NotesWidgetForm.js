import React, { useState } from "react";
import {v4 as uuid} from "uuid"; 
import PropTypes from "prop-types";

function NotesWidgetForm({ onAdd }) {
  const [form, setForm] = useState({ text: "" });

  const handleChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, text: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const note = {
      id: uuid(),
      content: form.text,
    };

    onAdd(note);
    setForm({ text: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="input-description" htmlFor="note">
        New Note
      </label>
      <textarea
        className="input"
        id="note"
        name="note"
        rows="5"
        value={form.text}
        onChange={handleChange}
        required
      ></textarea>
      <button className="btn add-btn">&#10148;</button>
    </form>
  );
}

NotesWidgetForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NotesWidgetForm;
