import React from "react";
import PropTypes from "prop-types";

function Note({ note, onDelete }) {
  return (
    <div className="note">
      <p className="note-content">{note.content}</p>
      <button className="btn delete-btn" onClick={() => onDelete(note.id)}>
        &#10060;
      </button>
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default Note;
