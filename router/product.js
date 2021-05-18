const Router = require('express').Router();

Router.get("/",(req, res)=>{
	res.json({path: '/product'})
})

Router.get("/:id",(req, res)=>{
	res.json({ path: '/product', id: req.params.id })
})

module.exports = Router;