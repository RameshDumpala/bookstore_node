import express, { request, response } from "express";
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to ramesh");
});


// save a newbook

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.price
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, price ",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      price: request.body.price,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.massage);
    response.status(500).send({ massage: error.massage });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error.massage);
    response.status(500).send({ massage: error.massage });
  }
});



//route for get one book from database by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findById(id);
    return response.status(200).json({ books });
  } catch (error) {
    console.log(error.massage);
    response.status(500).send({ massage: error.massage });
  }
});

//route for Updata for book
app.put("/books/:id", async (request, response) => {
    try {

        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.price
          ) {return response.status(400).send({
            message: "send all required fields: title, author, price ",
          });}

          const {id} = request.params;
           
          const result = await Book.findByIdAndUpdate(id, request.body);
          if(!request){
            return response.status(404).json({massage:"Book is found"})
          }

          return response.status(200).json({massage:"Book is successfully"})

    } 
    catch (error) {
      console.log(error.massage);
      response.status(500).send({ massage: error.massage });
    }

  });

  // route for Delete a Book

  app.delete('/books/:id',async (request,response) => {

    try{

        const {id} = request.params;
           
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({massage:"Book is found"})
          }

          return response.status(200).json({massage:"Book is successfully"})

    }catch(error){
        console.log(error.massage);
        response.status(500).send({massage: error.massage})

    }
  })

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
