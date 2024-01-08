const express = require("express")

const {bookModel} = require("../model/book.model")
const {auth} = require("../middleware/auth")
const jwt = require("jsonwebtoken")

const bookRouter = express.Router()

//post router for books data
bookRouter.post("/books",auth,async(req,res)=>{
    try{
        const {title,author,category,price,quantity}=req.body
        const newbookdata = new bookModel({title,author,category,price,quantity})
        await newbookdata.save()
        res.status(201).json({msg:"Books are Posted Sucessfully",newbookdata})
        
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something went wront to posting the book data"})
    }
})

//get method for retrive the data

bookRouter.get("/books",async(req,res)=>{
   try{

    let books = await bookModel.find()
    res.status(201).json({msg:"Books Are Here...",books})

   }
   catch(err){
    console.log(err)
    res.status(503).json({msg:"Something went wrong to Retrive the data.."})
   }
})

bookRouter.get("/books/:id",async(req,res)=>{
    try{
        const bookdata = await bookModel.findById(req.params.id)
        if(!bookdata){
          return res.status(501).json({msg:"This books are not avalable,try again later..."})
        }
        res.status(201).json({msg:"Your Book Are Here..",bookdata})
    }
    catch(err){
        console.log(err)
        res.status(502).json({msg:"Something went wrong to find this book..."})
    }

})
//edit or update route from book id
bookRouter.put('/books/:id',auth,async(req,res)=>{
    try{
          const {title,author,category,price,quantity}=req.body
          const updatedbook = await bookModel.findByIdAndUpdate(req.params.id,{title,author,category,price,quantity},{new:true});
          if (!updatedbook){
            return res.status(501).json({msg:'Something went wrong to update the book'})
          }
          res.status(201).json({msg:"Book updated sucessfully..",updatedbook})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something went wrong to update the data"})
    }
})

//for delete the specific book from its Id
bookRouter.delete("/books/:id",auth, async (req, res) => {
    try {
        const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ msg: 'Book not found, could not be deleted' });
        }
        res.status(200).json({ msg: 'Book deleted successfully', deletedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong while deleting the book' });
    }
});


module.exports = {
    bookRouter
}