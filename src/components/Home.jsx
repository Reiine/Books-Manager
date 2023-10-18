import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import Books from "./Books";
function MyVerticallyCenteredModal(props) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

    const handleSubmit = async () =>{
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/add`,{
                name,author,description
            });
            console.log(response.data);
        } catch (error) {
            console.log("Error submitting");
        }
        setLoading(false);
        props.onHide();
        props.onAddBook();

    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add A Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="author">Author:</label>
        <input type="text" onChange={(e)=>setAuthor(e.target.value)} />
        <label htmlFor="description">Description:</label><br />
        <textarea name="description" id="description" cols="81" rows="2" onChange={(e)=>setDescription(e.target.value)} ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>{loading? "Loading...": "Add"}</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [modalShow, setModalShow] = useState(false);
    const [booksData, setBooksData] = useState([]);
  
    useEffect(() => {
      const getBookData = async () => {
        const response = await axios.get(`${baseUrl}/get-book-data`);
        setBooksData(response.data);
      };
      getBookData();
    }, []); 
  
    const handleAddBook = async () => {
      const response = await axios.get(`${baseUrl}/get-book-data`);
      setBooksData(response.data);
    };

  return (
    <div className="cover">
      <h1 className="title">Books Directory</h1>
      <Button
        variant="success"
        onClick={() => setModalShow(true)}
        className="home-add"
      >
        Add
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAddBook={handleAddBook}
      />
        <div className="books-cover">
            {booksData.map((data)=>{
                return(
                    <Books name={data.name} author={data.author} description={data.description} id={data._id} handleAddBook={handleAddBook} />
                );
            })}
        </div>
    </div>
    
  );
}

export default Home;
