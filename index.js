const express = require("express");
const users= require("./MOCK_DATA.json");
const fs = require('fs');

const app= express();

app.use(express.urlencoded({extended:false}));

app.get("/api/users",(req,res)=>{
    res.setHeader("myName", "Divyam");
    return res.json(users);
}
    
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
    if(!user){
        return res.status(404).json({status:'failed', message:'User not found'});
    }
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
app.post("/api/users",(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email ||!body.gender || !body.job_title ){
        return res.status(400).json({status:'failed', message:'Please provide all the fields'});
    }
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        // console.log("Body :", body);
    return res.status(201).json({status:'success', id: users.length});
    })
});

const PORT=8000;
app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));