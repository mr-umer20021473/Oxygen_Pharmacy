import Products from "../models/Products.js";
import Sales from "../models/Sales.js";

export const getStats = async (req, res) => {
    try {
        const totalProducts = await Products.countDocuments();
        const totalSales = await Sales.countDocuments();
        const totalRevenue = await Sales.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]);

        res.json({
            totalProducts,
            totalSales,
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
