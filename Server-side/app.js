const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


///express setup...

const app = express();
app.use(express.json());
app.use(cors());

//mongodb conntection()

const uri = process.env.MongoDB_String;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() =>{
    console.log("Successfully connected to mongodb server!");
}).catch((err) =>{
    console.log(err);
});

///set up routes

app.use("/user", require("./routes/userRouter"))





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("The Server has started on port: " + PORT);
})