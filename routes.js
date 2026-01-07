const express = require("express");
const router = express.Router();

const { getAllProducts, getProductById, addProduct, addProducts, deleteProduct, vegProduct, getAllVegProducts, deleteVegProduct,
    addNonVegProduct,
  getAllNonVegProducts} = require("./productservice");
const { create } = require("./schema");
const { getAllOrders, createOrder } = require("./productcontroller");
const { registerUser } = require("./productcontroller");
const { loginController } = require("./productcontroller");   // ⬅️ add this new import
const authMiddleware = require("./authentication");


// router.use(authMiddleware);

router.post("/login", loginController);
router.post("/register", registerUser);   // save user
//router.use(authMiddleware);



router.get("/getAll", getAllProducts);                 // load all products
router.get("/getById/:id", getProductById);            // load single product by id
router.post("/save", addProduct);                      // save single product
router.post("/saveAll", addProducts);                  // save multiple products
router.delete("/delete/:id", deleteProduct);           // delete by id


router.post("/vegProducts", vegProduct);               // save veg products
router.get("/vegProducts", getAllVegProducts); // get all veg products  (fixed duplicate route)
router.delete("/vegProducts/:id", deleteVegProduct);   // ★ delete veg product by id


// NON VEG ROUTES
router.post("/nonVegProducts", addNonVegProduct);   // save non veg products
router.get("/nonVegProducts", getAllNonVegProducts); // get all non veg products


//order saved url
router.post("/orders",createOrder);
router.get("/orders",getAllOrders);


module.exports = router;
//idiot