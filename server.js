const experss = require('express');
const app = experss();
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

app.use(experss.json())

const users = [];

app.get('/users',(req,res)=>{
    res.json(users)
});

app.post('/users', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = {name:req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send();
    }
})

app.post('/users/login', async (req,res)=>{
    const user = users.find(user=>user.name = req.body.name)
    if (user == null) {
        return res.status(400).send("Cannot find user")
    }
})

app.listen(3000);