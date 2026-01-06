import express from 'express';
import dotenv from 'dotenv/config.js';

const app = express()
const PORT = process.env.PORT || 5001


app.get("/maja", (req, res)=>{
    res.send("Aamma maja thaan");
})

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
})
