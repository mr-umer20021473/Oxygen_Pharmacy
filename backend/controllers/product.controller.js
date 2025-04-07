import Products from "../models/Products.js";


export const addProduct = async (req,res) =>{

    try{
        const { name, price, stock, expiryDate , company} = req.body;

        const product = new Products({
            name,price,stock,expiryDate, company
        })

        await product.save()

        res.status(201).json(product)


    }catch(error){
        res.status(500).json({message:error.message})
    }

}

export const getProducts = async(req,res) =>{
    try{
        const products = await Products.find()
        res.json(products)

    }catch(error){
        res.status(500).json({message:error.message})

    }
}