

const { 
  getAllProductsService, 
  getProductByIdService, 
  addProduct, 
  addProducts, 
  vegProduct, 
  deleteProduct, 
  createNewOrder, 
  fetchAllOrders, 
  loginService
} = require("./productservice");
const { registerNewUser } = require("./productservice");
const { loginUserService } = require("./productservice");  // ⬅️ import login service
//const { loginController } = require("./productservice");

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// GET product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

// CREATE single product
const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const savedProduct = await addProduct(newProduct);
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
};

// CREATE multiple products
const createProducts = async (req, res) => {
  try {
    const newProducts = req.body;
    await addProducts(newProducts);
    res.status(201).json({ message: "All products added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add products", error });
  }
};

// CREATE veg products
const createVegItems = async (req, res) => {
  try {
    const vegProducts = req.body;
    await vegProduct(vegProducts);
    res.status(201).json({ message: "All veg products added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add veg products", error });
  }
};

// DELETE product by ID
const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteProduct(id);
    if (deleted) {
      res.json({ message: `Product with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// CREATE order
const createOrder = async (req, res) => {
  try {
    const orderDetails = req.body;
    const savedOrder = await createNewOrder(orderDetails);
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};


const registerUser = async (req, res) => {
  let userDetails = req.body;
  let result = await registerNewUser(userDetails);
  res.json(result);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUserService(email, password);
  res.json(result);
};

//JWT
const loginController=async(req,res)=>{
  //get the req data
  const{email,password}=req.body;
  //give the data to the service layer
  const response=await loginService(email,password);
  //send the response
  return res.json({
    status:response.status,
    message:response.message,
    token:response.token,
    user:response.user,
  });
};



module.exports = { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  createProducts, 
  createVegItems, 
  deleteProductById, 
  createOrder, 
  getAllOrders,
   registerUser ,
     loginUser  ,
     loginController 
};
