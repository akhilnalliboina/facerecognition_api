const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
var bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
app.use(cors())
const knex = require('knex')
const signin=require('./controllers/signin')
const register=require('./controllers/register')
const profile=require('./controllers/profile')
const image=require('./controllers/image')

const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true
    }
  });


app.get('/',(req,res)=>{res.send('its working')})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>profile.handleProfile(req,res,db))
app.put('/image',(req,res)=>image.handleImage(req,res,db))
app.post('/imageurl',(req,res)=>image.handleApiKey(req,res))

app.listen(process.env.PORT || 3000,()=>{
    console.log('app is running on port ${process.env.PORT}')
})
