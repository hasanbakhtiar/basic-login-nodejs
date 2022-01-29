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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {name:req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send();
    }
})
app.listen(3000);