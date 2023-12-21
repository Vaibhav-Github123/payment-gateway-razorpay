const Product = require("../model/product");
const Cart = require("../model/cart");
const Rezorpay = require('razorpay');
const {REZORPAY_KEY_ID,REZORPAY_SECRET_KEY} = process.env

var instance = new Rezorpay({
    key_id:  REZORPAY_KEY_ID,
    key_secret: REZORPAY_SECRET_KEY
})

exports.AddProduct = async (req, res) => {
    try {
        const {product_name, price, category} = req.body
        const data = new Product({
            product_name: product_name,
            price: price,
            category: category
        });
        await data.save()
        res.send(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
};

exports.productPage = async (req, res) => {
    try {
        const product = await Product.findAll()
        res.render('product',{products: product})
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
};

exports.AddToCart = async (req, res) => {
    try {
        const {product_name, price, category, product_quantity} = req.body
       const product = new Cart({
        product_name: product_name,
            price: price,
            category: category,
            product_quantity: product_quantity,
        });
        await product.save()
        res.send({
            status: true,
            data: product,
            message: "Product has been successfully added to the cart.",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

exports.getCartPage = async (req,res) =>{
    try {
        const cartproduct = await Cart.findAll()
        res.render('cart',{
            carts: cartproduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

exports.deleteProd = async (req, res) =>{ 
    try {
        const id = req.params.id;

    const productDel = await Cart.destroy({ where: { id },force: true });
    if (productDel) {
      res.redirect("/cartpage");
    }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}



exports.ProdSuccessPaymet = async function(req,res){
try {
    res.render('success')
} catch (error) {
    return res.status(500).json({
        message: error.message,
      });
}
}

exports.ProdCanclePaymet = async function(req,res){
    try {
        res.render('cancle')
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}



exports.checkoutProd = async function( req,res){

    try {
        const amount = req.body.price*100
        const options = {
                    amount: amount,
                    currency: 'INR',
                    receipt: 'razorUser@gmail.com'
                }
        const rzpOrder = await instance.orders.create(options);
        res.status(200).send({
            success: true,
            msg: 'Order Created',
            order_id: rzpOrder.id,
            amount: amount,
            key_id: REZORPAY_KEY_ID,
            product_name: req.body.name,
            contact: "9081795935",
            name: "Vaibhav",
            email: "mathukiyavaibhav0809@gmial.com"
        });

    } catch (err) {
        console.error(err);
        res.status(400).send({ success: false, msg: 'Something went wrong!' });
    }



}