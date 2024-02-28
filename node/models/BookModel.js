import mongoose from "mongoose"

const bookschema = mongoose.Schema(
    {
        title:{
            type: String,
            require : true,
        },
    
        author:{
            type: String,
            require : true,
        },
        price:{
            type: String,
            require : true,
        }
        
    },
  
)




export const Book = mongoose.model("books",bookschema)