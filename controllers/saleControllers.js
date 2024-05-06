const Sale = require('../models/sale');
const Product = require('../models/product');


//create a new sale
const createSale = async (req, res) => {
    //Get the id of product
    const productId = req.body.productId;
   
    //Get the sent in data off request body
    const priceSale = req.body.priceSale;
    const quantitySale = req.body.quantitySale;
    const saleType = req.body.saleType;
    const fechaDeVenta = req.body.fechaDeVenta;

   // get the product with the id
   const product = await Product.findById(productId).exec();

   if(quantitySale > product.quantity){
         return res.status(400).json({error: "No hay suficiente cantidad de productos"});
   }else{
        //create a a new product
        const sale = await Sale.create({
        id: product.id,
        name: product.name,
        productid: productId,
        priceSale: priceSale,
        quantitySale: quantitySale,
        saleType: saleType,
        fechaDeVenta: fechaDeVenta,
        });

        //actializamos la cantidad de productos en la base de datos
        const quantity = product.quantity - quantitySale;
        await Product.findByIdAndUpdate(productId,{
        quantity: quantity,
        }).exec();

        // Respond with the created product
    res.json({sale: sale});
   }

};

const fetchSale = async (req, res) => {
    //Get id off the url
    const saleID = req.params.id;
    //Find the product by id
    const sale = await Sale.findById(saleID).exec();
    //Respond with the product
    res.json({sale: sale});
    
};


const updateSale =async (req, res) => {
    //Get id off the url
    const saleID = req.params.id;
    //Get the data off the req body
    const quantity = req.body.quantity;
    const size = req.body.size;
    //Find and update the record
    const sale= await Sale.findById(saleID).exec();

    //modifie the quantity of the product
    const product = await Product.findById(sale.productid).exec();

    if(quantity > (product.quantity+sale.quantitySale)){
        return res.status(400).json({error: "No hay suficiente cantidad de productos"});
    }else{
        Sale.findByIdAndUpdate(saleID,{
            quantitySale: quantity,
            size: size,
        }).exec();
       const quantityProduct = (product.quantity + sale.quantitySale) - quantity;
       await Product.findByIdAndUpdate(sale.productid,{
        quantity: quantityProduct,
    }).exec();
    }

    //Respond with the product
    res.json({sale: sale});
    
};

const fetchProductWithIdAAndSize = async (req, res) => {
   //get id and size off body
    const productId = req.body.productId;
    const size = req.body.size;
    try{
        const product = await Product.findById(productId).exec();
        if(!product){
            return res.status(400).json({error: "No se encontro el producto"});
        }
        
        //de los productos obtenidos filtramos por el tamaño
        const products = await Product
        res.json({sales: sales});

    }catch(error){
        return res.status(400).json({error: "No se encontro el producto"});
    }
};

const fetchProductwithColor = async (req, res) => {

    try{
        const color = req.body.color;
        
        const products = await Product.find({color: color}).exec();
        if(!products || products.length === 0){
            return res.status(400).json({error: "No se encontro el producto :)"});
        }
        
         //obtenemos el ID de los productos
         const productIds = products.map(product => product._id);

         //de las ventas que tenemos filtramos por productsIds
         const sales = await Sale.find({productid: {$in: productIds}}).exec();

        //respondemos con las ventas
        res.json({sales: sales});
       
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const fetchSalesByDateRange = async (req, res) => {
    try {
        const startDate = req.body.startDate; // Obtener la fecha de inicio del cuerpo de la solicitud
        const endDate = req.body.endDate; // Obtener la fecha de fin del cuerpo de la solicitud
        
        // Buscar todas las ventas dentro del rango de fechas
        const sales = await Sale.find({
            fechaDeVenta: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).exec();

        // Responder con las ventas encontradas
        res.json({ sales: sales });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



module.exports = {
        createSale: createSale,
        fetchSale: fetchSale,
        updateSale: updateSale,
        fetchProductWithIdAAndSize: fetchProductWithIdAAndSize,
        fetchProductwithColor: fetchProductwithColor,
        fetchSalesByDateRange: fetchSalesByDateRange,
}; 