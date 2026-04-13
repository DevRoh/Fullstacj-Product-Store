import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Product from './models/product.model.js'

dotenv.config()

const app = express()
app.use(express.json()) // Allows us to accept JSON data in the body

app.get('/api/products',async(req,res)=>{
    try {
        const products = await Product.find({}) // We give empty object here so that all the product find is given
        res.status(200).json({success:true,products})
    } catch (error) {
        console.log("Error in fetching Products: ",error.message)
        res.status(400).json({success:false,message:"Error in fetching Products"})
    }
})

app.post('/api/products',async(req,res)=>{
    const product = req.body

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({message:"Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success:true,data:newProduct})

    } catch (error) {
        console.error("Error in Create Product: ",error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
})

app.delete('/api/products/d/:id',async(req,res)=>{
    const {id} = req.params
    // console.log(id)
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true,message: "Product deleted"})
    } catch (error) {
        res.status(404).json({success:false,message:"product not found"})
    }
})

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})