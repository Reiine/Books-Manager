const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const books = require("./models/books");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT ||3001;
app.post('/add',async (req,res)=>{
    const {name,author,description} = req.body;
    try {
        const regBook = new books({
            name,author,description
        });
        const saveBook = await regBook.save();
        res.json("success")
    } catch (error) {
        console.log("error saving", error);
    }
});

app.get("/get-book-data", async (req, res)=>{
    try {
        const bookData = await books.find({});
        res.json(bookData)
    } catch (error) {
        console.log("Error getting book data", error);
    }
});

app.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
      const deletedBook = await books.findOneAndDelete({ _id: id });
  
      if (deletedBook) {
        res.json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      console.log("Could not delete book", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/update', async (req, res) => {
    const { name, description, author, id } = req.body;
    try {
        const book = await books.findOneAndUpdate(
            { _id: id },
            { name: name, description: description, author: author },
            { new: true }
        );
        if (book) {
            res.json("Updated Successfully");
        } else {
            res.json("Book not found");
        }
    } catch (error) {
        console.log("Couldn't update book", error);
        res.status(500).json("Internal Server Error");
    }
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})