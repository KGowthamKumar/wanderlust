const mongoose = require("mongoose"); //we mongosse library
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Customer");
}

// Order Schema
const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("order", orderSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const Customer = mongoose.model("customer", customerSchema);

// Add Orders
const addOrders = async () => {
  let res = await Order.insertMany([
    { item: "samosa", price: 12 },
    { item: "chips", price: 10 },
    { item: "chocolate", price: 40 },
  ]);

  console.log(res);
};

// Add Customer
const addCustomer = async () => {
  let cust1 = new Customer({
    name: "rahul kumar",
  });

  let order1 = await Order.findOne({ item: "chips" });
  let order2 = await Order.findOne({ item: "chocolate" });

  cust1.orders.push(order1._id);
  cust1.orders.push(order2._id);

  let result = await cust1.save();

  console.log(result);
};
const getData = async () => {
  let result = await Customer.find().populate("orders");

  console.log("\nPopulated Data:\n");
  console.log(JSON.stringify(result, null, 2));
};
async function start() {
  await addOrders();
  await addCustomer();
  await getData();

  mongoose.connection.close();
}

start();