import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

function MyVerticallyCenteredModal(props) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = async () => {
    const name = editName || props.name;
    const description = editDescription || props.description;
    const author = editAuthor || props.author;
    setLoading(true);
    try {
      const id = props.id;
      const response = await axios.put(`${baseUrl}/update`, {
        id,
        name,
        description,
        author
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error submitting");
    }
    setLoading(false);
    props.onHide();
    props.onAddBook();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit The Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          onChange={(e) => setEditName(e.target.value)}
          defaultValue={props.name}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          onChange={(e) => setEditAuthor(e.target.value)}
          defaultValue={props.author}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          onChange={(e) => setEditDescription(e.target.value)}
          defaultValue={props.description}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          {loading ? "Loading..." : "Save Changes"}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Books({ name, author, description, id, handleAddBook }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [modalShow, setModalShow] = useState(false);
  const truncatedDescription = truncateText(description, 55);

  const handleDelete = async () => {
    const response = await axios.post(`${baseUrl}/delete`, {
      id,
    });
    console.log(response.data);
    handleAddBook();
  };

  return (
    <div className="single-book-cover">
      <p>{name}</p>
      <p>{author}</p>
      <p>{truncatedDescription}</p>
      <div>
        <Button variant="danger" onClick={handleDelete} className="delete-btn">
          Delete
        </Button>
        <Button variant="warning" onClick={() => setModalShow(true)}>
          Edit
        </Button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAddBook={handleAddBook}
        name={name}
        description={description}
        author={author}
        id={id}
      />
    </div>
  );
}

export default Books;
