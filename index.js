const express = require("express")
const app = express();
const moongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// setting up server  with mongodb and making a statement to make sure the server is running correctly  or if there is an error.
dotenv.config();

moongoose.connect(process.env.DATABASE_URL)
.then(() => console.log(" successful"))
.catch((err) => {
    console.log(err);
});
app.use(cors());
app.use(express.json());

//this is used to call all the  routes.
app.use("/api/auth", authRoute); //call the authentication route
app.use("/api/user", userRoute);// to call the user route
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);




// listening port
app.listen(process.env.PORT|| 8000, () => {
    console.log("server is running")
});