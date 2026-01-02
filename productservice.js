const mongoose = require("mongoose"); 
//const { default: mongoose } = require("mongoose");
const { ordersSchema, productSchema} = require("./schema");
 const { userSchema } = require("./schema");
 const jwt = require("jsonwebtoken");


// Veg collection
const VegProductModel = mongoose.model("VegProducts", productSchema);
// Non-Veg collection
const NonVegProductModel = mongoose.model("NonVegProducts", productSchema);

// GET all
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
};

// GET BY ID
const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (product) res.json(product);
  else res.json({ message: "Product not found" });
};

// SAVE
const addProduct = async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.json({ message: "Product saved", product });
};

// SAVE all
const addProducts = async (req, res) => {
  await ProductModel.insertMany(req.body);
  res.json({ message: "All products saved successfully" });
};

// SAVE VEG PRODUCTS
const vegProduct = async (req, res) => {
  await VegProductModel.insertMany(req.body);
  res.json({ message: "All veg products saved successfully" });
};

// GET all Veg products
const getAllVegProducts = async (req, res) => {
  const products = await VegProductModel.find();
  res.json(products);
};

// DELETE
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await ProductModel.findByIdAndDelete(id);
  if (result) res.json({ message: "Product deleted" });
  else res.json({ message: "Product not found" });
};
//DELETE VEGPRODUTS BASED ON ID
const deleteVegProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await VegProductModel.findByIdAndDelete(id);
    
    if (!result) {
      return res.json("Veg Product Not Found");
    }
    res.json("Veg Product Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};




// SAVE MULTIPLE NON-VEG PRODUCTS
const addNonVegProduct = async (req, res) => {
  try {
    await NonVegProductModel.insertMany(req.body);
    res.json({ message: "All non-veg products saved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET all Non-Veg products
const getAllNonVegProducts = async (req, res) => {
  try {
    const products = await NonVegProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};





//orders
let orderModel = mongoose.model("orders", ordersSchema);
//create new order
const createNewOrder = (orderDetails) => {
  new orderModel(orderDetails).save();
}

 const fetchAllOrders = async () => {
            const orders = await orderModel.find();
             return orders || []; 
        };

let UserModel = mongoose.model("users", userSchema);

const registerNewUser = async (userDetails) => {
  let newUser = new UserModel(userDetails);
  await newUser.save();
  return { success: true, message: "Registered successfully" };
};
//LOGIN USER
const loginUserService = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return { success: false, message: "User not found" };
  }
  if (user.password !== password) {
    return { success: false, message: "Invalid password" };
  }
  return {
    success: true,
    message: "Login successful",
    user,
  };
};

//JWT
const loginService=async(email,password)=>{
  //1.check user existence
  const user=await UserModel.findOne({email});
  if(!user){
    return{status:false,message:"User not found"};
  }
  console.log(user);
  //2.compare password
  const isValid=password===user.password;
  console.log(isValid);
  if(!isValid){
    return{status:false,message:"Invalid email or password"};
  }
  //3.GENERATE JWT TOKKEN
  const token=jwt.sign(
    {id:user._id,
email:user.email,
    },
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRES_IN}
  );
  console.log(token);
  //4.Return sucessfull respose+token+user data
  return{
    status:true,
    message:"Login sucessful",
    token,
    user
  };
};


module.exports = { getAllProducts, getProductById, addProduct, addProducts, deleteProduct, vegProduct, getAllVegProducts,createNewOrder,fetchAllOrders, registerNewUser ,loginUserService,loginService, deleteVegProduct,
  addNonVegProduct,
  getAllNonVegProducts
};
