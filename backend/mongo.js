const mongoose = require("mongoose");

require("dotenv").config();

mongoose.Promise = global.Promise;
// console.log(process.env.MONGOURI);
// console.log("okk")


mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});;

