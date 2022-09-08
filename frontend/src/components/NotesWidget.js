import React from "react";
import NotesWidgetForm from "./NotesWidgetForm";
import Note from "./Note";

class NotesWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };

    this.updateState = this.updateState.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  async updateState() {
    const data = await fetch(process.env.REACT_APP_NOTES_URL).then((response) =>
      response.json()
    );
    this.setState((prevState) => ({ ...prevState, notes: data }));
  }

  async handleAdd(note) {
    await fetch(`${process.env.REACT_APP_NOTES_URL}`, {
      method: "POST",
      body: JSON.stringify(note),
    });

    this.updateState();
  }

  async handleDelete(id) {
    await fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {
      method: "DELETE",
    });

    this.updateState();
  }

  render() {
    return (
      <div className="widget">
        <div className="widget-header">
          <h2 className="widget-title">Notes</h2>
          <button className="btn refresh-btn" onClick={this.updateState}>
            &#8634;
          </button>
        </div>
        <div className="widget-body">
          {this.state.notes.map((note) => (
            <Note key={note.id} note={note} onDelete={this.handleDelete} />
          ))}
        </div>
        <div className="widget-footer">
          <NotesWidgetForm onAdd={this.handleAdd} />
        </div>
      </div>
    );
  }
}

export default NotesWidget;
