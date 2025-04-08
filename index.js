const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();

//Mongoose Connnection
mongoose
    .connect('mongodb://127.0.0.1:27017/yt_app')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("Mongo Error", err));

//Schema for MongoDB
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
        },
        job_title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

//model for MongoDB
const User = mongoose.model('user', userSchema);


//Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
    const allDbUsers= await User.find({});

    res.setHeader("X-myName", "Divyam");
    return res.json(allDbUsers);
}
);

app.get("/users", async (req, res) => {
    const allDbUsers= await User.find({});
    const html = `<ul>
${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`
    ).join("")}
</ul>`;
    res.send(html);
});



app.route("/api/users/:id").get(async (req, res) => {
    const user= await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: 'failed', message: 'User not found' });
    }
    return res.send(user);
}).put((req, res) => {
    return res.json({ status: 'pending' })
}).patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {last_name:"Jha"})
    return res.json({ status: 'success' });
}).delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: 'success' });
})
// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return  res.send(user);
// });
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ status: 'failed', message: 'Please provide all the fields' });
    }
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     // console.log("Body :", body);
    //     return res.status(201).json({ status: 'success', id: users.length });
    // })
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    })

    console.log("Result :", result);
    return res.status(201).json({ status: 'success' });

});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));