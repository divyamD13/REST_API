const express = require("express");
const users= require("./MOCK_DATA.json");

const app= express();

app.get("/api/users",(req,res)=>
    res.json(users)
);

app.get("/users",(req,res)=>{
const html=`<ul>
${users.map((user)=>`<li>${user.first_name}</li>`
).join("")}
</ul>`;
res.send(html);
});

app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return  res.send(user);
}).put((req,res)=>{
    return res.json({status:'pending'});
}).patch((req,res)=>{
    return res.json({status:'pending'});
}).delete((req,res)=>{
    return res.json({status:'pending'});
})
// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return  res.send(user);
// });

const PORT=8000;
app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));