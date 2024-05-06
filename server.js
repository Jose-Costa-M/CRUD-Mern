//Load env variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
// Import dependedncies
const express = require('express');
const connectToDb = require('./config/connectToDb');
const productController = require('./controllers/productControllers');
const saleControllers = require('./controllers/saleControllers');


// Create an express app
const app = express();

//Congigure express app
app.use(express.json());

//Connect to the database
connectToDb();

//Routing
app.get('/', (req, res) => {
    res.json({hello: "world"});
});


//Functions for Products
//create a new product
app.post('/products', productController.createProduct);

//create new same product
app.post('/products/:id', productController.createSameProduct);

//Find a product by id
app.get('/products/:id', productController.fetchProduct );

//update a product by id
app.put('/products/:id', productController.updateProduct);

//delete a product by id
app.delete('/products/:id',productController.deleteProduct);

//Functions for Sales

//create a new sale
app.post('/sales', saleControllers.createSale);

//Find a sale by id
app.get('/sales/:id', saleControllers.fetchSale );

//update a sale by id 
app.put('/sales/:id', saleControllers.updateSale);

//fetch a sales with date range
app.get('/sales', saleControllers.fetchSalesByDateRange);


//fetch a sales by color
app.get('/sales', saleControllers.fetchProductwithColor);

//fetch a sale by id and size
app.get('/sales', saleControllers.fetchProductWithIdAAndSize);






//start our server
app.listen(process.env.PORT);