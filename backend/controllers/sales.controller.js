import Products from "../models/Products.js";
import Sale from "../models/Sales.js";


export const addSale = async (req, res) => {
    try {
        const { product, quantity, totalPrice } = req.body;
        
        const med = await Products.findById(product);
        if (!med) return res.status(404).json({ message: 'Product not found' });

        if (med.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });
        med.stock -= quantity;
        await med.save();

        const sale = new Sale({ product, quantity, totalPrice });
        await sale.save();
        res.status(201).json({message: 'Sale created successfully',sale});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};