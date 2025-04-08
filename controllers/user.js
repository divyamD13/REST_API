const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers= await User.find({});
    //setting a custom header
    //res.setHeader("X-myName", "Divyam");
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user= await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ status: 'failed', message: 'User not found' });
    }
    return res.send(user);
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {last_name:"Jha"})
    return res.json({ status: 'success' });
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: 'success' });
}

async function handleCreateNewUser(req,res){
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
    return res.status(201).json({ status: 'success' , id: result._id });

}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}