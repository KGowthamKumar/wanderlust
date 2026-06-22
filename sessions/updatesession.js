// const express = require("express")
// const session = require("express-session")

// const app = express()

// // session middleware
// // app.use(session({
// //     secret: "mysecretkey",
// //     resave: false,
// //     saveUninitialized: true
// // }))


// // route
// app.get("/", (req, res) => {

//     if(req.session.count){
//         req.session.count++
//     }
//     else{
//         req.session.count = 1
//     }

//     res.send(`Count = ${req.session.count}`)
// })

// let count = 0
// app.get("/nosession", (req, res) => {
//   count++
//     res.send(`Count = ${count}`)
// })



// app.listen(3000, () => {
//     console.log("Server running on port 3000")
// })