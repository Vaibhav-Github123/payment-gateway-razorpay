const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");

router.post("/add", ProductController.AddProduct);

router.get('/', ProductController.productPage)

router.post('/addtocart', ProductController.AddToCart)

router.get('/cartpage', ProductController.getCartPage)

router.get('/delete-prod/:id',ProductController.deleteProd)

router.post('/create-checkout', ProductController.checkoutProd)

router.get('/success-paymet',ProductController.ProdSuccessPaymet)

router.get('/cancle-paymet',ProductController.ProdCanclePaymet)
module.exports = router;
