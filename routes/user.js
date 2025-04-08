const express = require('express');
const router = express.Router();
const { 
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById, 
    handleCreateNewUser 
} = require("../controllers/user");

router.route("/")
.get( handleGetAllUsers)
.post( handleCreateNewUser);

// router.get("/users", async (req, res) => {
//     const allDbUsers= await User.find({});
//     const html = `<ul>
// ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`
//     ).join("")}
// </ul>`;
//     res.send(html);
// });



router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)
    .put((req, res) => {
        return res.json({ status: 'pending' })
    })
// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return  res.send(user);
// });

module.exports = router;