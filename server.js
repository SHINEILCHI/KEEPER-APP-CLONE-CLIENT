const express = require("express");
const app = express();

app.use(express.static("./build"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
    console.log("Server is running at port: 5000");
})
