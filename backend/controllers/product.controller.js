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

export const getProducts = async (req, res) => {
    try {
        const { sortBy = 'name', sortType = 'asc', search = '' } = req.query;

        const searchFilter = search
            ? {
                  $or: [
                      { name: { $regex: search, $options: 'i' } },

                  ],
              }
            : {};

        const sortOrder = sortType === 'desc' ? -1 : 1;
        const sortOptions = { [sortBy]: sortOrder };

        const products = await Products.find(searchFilter).sort(sortOptions);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Medicine not found' });
        res.json({ message: 'product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
