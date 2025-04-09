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

export const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('product');
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('product');
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateSaleById = async (req, res) => {
    try {
        const { product, quantity, totalPrice } = req.body;
        
        const sale = await Sale.findById(req.params.id);
        if (!sale) return res.status(404).json({ message: 'Sale not found' });

        const med = await Products.findById(product);
        if (!med) return res.status(404).json({ message: 'Product not found' });

        const previousProduct = await Products.findById(sale.product);
        if (previousProduct) {
            previousProduct.stock += sale.quantity; 
            await previousProduct.save();
        }

        const quantityDifference = quantity - sale.quantity; 
        
        if (med.stock < quantityDifference) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        
        med.stock -= quantityDifference;
        await med.save();

        sale.product = product;
        sale.quantity = quantity;
        sale.totalPrice = totalPrice;
        
        await sale.save();
        res.status(200).json({message: 'Sale updated successfully',sale});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
