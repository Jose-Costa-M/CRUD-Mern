const Product = require('../models/product');   

const createProduct = async (req, res) => {
    // Get the sent in data off request body
    const id = req.body.id;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const material = req.body.material;
    const color = req.body.color;
    const size = req.body.size;
    const createAT = req.body.createAT;
    
    //create a a new product
    const product = await Product.create({
        id: id,
        name: name,
        quantity: quantity,
        price: price,
        material: material,
        color: color,
        size: size,
        createAT: createAT
    });
    // Respond with the created product
    res.json({product: product});
};

const createSameProduct = async (req, res) => {

    //get the id of the product
    const productID = req.params.id;
    //Find the product by id
    const productAux = await Product.findById(productID).exec();
    // Get the sent in data off request body
    const id = productAux.id;
    const name = productAux.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const material = productAux.material;
    const color = req.body.color;
    const size = req.body.size;
    const createAT = req.body.createAT;
    
    //create a a new product
    const product = await Product.create({
        id: id,
        name: name,
        quantity: quantity,
        price: price,
        material: material,
        color: color,
        size: size,
        createAT: createAT
    });
    // Respond with the created product
    res.json({product: product});
};

const fetchProduct = async (req, res) => {
    //Get id off the url
    const productID = req.params.id;
    //Find the product by id
    const product = await Product.findById(productID).exec();
    //Respond with the product
    res.json({product: product});
    
};


const updateProduct =async (req, res) => {
    //Get id off the url
    const productID = req.params.id;
    //Get the data off the req body
    const color = req.body.color;
    const size = req.body.size;
    //Find and update the record
    await Product.findByIdAndUpdate(productID,{
        color: color,
        size: size,
    }).exec();
    //Find the updated product
    const product = await Product.findById(productID).exec();
    //Respond with the product
    res.json({product: product});
    
};

const deleteProduct = async (req, res) => {
    //Get id off the url
    const productID = req.params.id;
    //Find and update the record
    await Product.deleteOne({id: productID}).exec();
    //Respond with the product
    res.json({succes: "deleted"});
    
};


module.exports = {
    createProduct: createProduct,
    fetchProduct: fetchProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    createSameProduct: createSameProduct,
}