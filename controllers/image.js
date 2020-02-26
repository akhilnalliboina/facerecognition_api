const Clarifai=require('clarifai')


const app = new Clarifai.App({
    apiKey: '4aa73aaeaffa4c0f954ace815c32ca1c'
   });

   const handleApiKey=(req,res)=>{
   app.models
   .predict(Clarifai.CELEBRITY_MODEL, req.body.input).then(data=>res.json(data).catch(err=>{res.status(400).json('unable to work with API')}))}

const handleImage=(req,res,db)=>{
    const {id}= req.body;
    db('users').returning('entries').where('id','=',id)
    .increment('entries',1)
  .then(entries=>
    {res.json(entries[0])})
    .catch(err=>{res.status(400).json('unable to get count')})
    
}

module.exports={
    handleImage:handleImage,
    handleApiKey:handleApiKey
}