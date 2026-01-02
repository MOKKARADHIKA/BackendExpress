


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");

const app = express();


//Acess the above configuration in server.js
require("dotenv").config();
app.listen(process.env.PORT,()=>{
    console.log("server is running on http://localhost:3000");
});
mongoose.connect(process.env.MONGO_URL)


app.use(cors());
app.use(express.json());

// Use router only once
app.use("/api/v1/products", router);

// MongoDB connection
mongoose.connect("mongodb+srv://mokkaradhika:Radhika1%25@cluster0.cymawvz.mongodb.net/productsDB?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running at http://localhost:3000"));


app.use("/api/v1/products",router);

//const cors = require("cors");
// app.use(cors());




 

// simple routes
app.get("/greet", (req, res) => {
    res.send("Hello World! Welcome to our Ratan sir classes");
});

app.get("/hello", (req, res) => {
    res.send("welcome to sathya tech");
});

// single product
app.get("/product", (req, res) => {
    res.send({ id: 101, name: "laptop", price: 65000.00 });
});

// products array
const products = [
    { id: 101, name: "laptop", price: 65000.00 },
    { id: 102, name: "mobile", price: 35000.00 },
    { id: 103, name: "tablet", price: 25000.00 }
];

app.get("/products", (req, res) => {
    res.send(products);
});

// dynamic product
app.get("/product/:id", (req, res) => {
    let productId = parseInt(req.params.id);
    let product = products.find(p => p.id === productId);

    if (product) {
        res.send(product);
    } else {
        res.send({ message: "product not found" });
    }
});

// user email search
const users = [
    { name: "ravi", email: "ravi5@gmail.com" },
    { name: "kavya", email: "kavyai95@gmail.com" },
    { name: "chandhu", email: "chandhu85@gmail.com" }
];

app.get("/users/:email", (req, res) => {
    const email = req.params.email;
    const user = users.find(u => u.email === email);

    if (user) {
        res.send(user);
    } else {
        res.send({ message: "email not found" });
    }
});

// items for price filters
const items = [
    { id: 101, name: "laptop", price: 65000.00 },
    { id: 102, name: "mobile", price: 35000.00 },
    { id: 103, name: "tablet", price: 25000.00 }
];

// min & max filter
app.get("/items/filter", (req, res) => {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);

    const result = items.filter(item =>
        item.price >= min && item.price <= max
    );

    res.send(result);
});

// ONLY min price filter
app.get("/items/min", (req, res) => {
    const min = parseInt(req.query.min);
    const result = items.filter(item =>
        item.price >= min
    );
    res.send(result);
});
// get items based on max price
app.get("/items/max", (req, res) => {
    const max = parseInt(req.query.max);

    const result = items.filter(item =>
        item.price <= max
    );

    res.send(result);
});
const employees = [
    { id: 1, name: "Ravi", department: "HR", salary: 30000 },
    { id: 2, name: "Kavya", department: "IT", salary: 50000 },
    { id: 3, name: "Chandhu", department: "Sales", salary: 25000 },
    { id: 4, name: "Manu", department: "IT", salary: 45000 },
    { id: 5, name: "Anu", department: "HR", salary: 32000 }];
app.get("/employees/:dept", (req, res) => {
    const dept = req.params.dept.toUpperCase(); // normalize
    const result = employees.filter(e =>
        e.department.toUpperCase() === dept
    );
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send({ message: "employee not found" });
    }
});

//converts js object into json object
const userss={name:"virat",age:22,active:true};
const jsonData = JSON.stringify(userss);
console.log(jsonData);
