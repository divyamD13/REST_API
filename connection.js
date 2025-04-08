const mongoose  = require ('mongoose');

mongoose.set("strictQuery", true)
//Mongoose Connnection
async function connectMongoDB(url){
    return mongoose
        .connect(url)
        // .then(() => {
        //     console.log("Connected to MongoDB");
        // })
        // .catch((err) => console.log("Mongo Error", err));
};

module.exports={
    connectMongoDB,
};
