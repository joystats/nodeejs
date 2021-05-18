const express =  require('express')
const app = express();
const productRouter = require('./router/product')
const path = require('path')
const { Server } = require('socket.io')

app.use(express.json())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'public'))
app.use(express.static(path.join(__dirname,'public')))

app.use("/product",productRouter);

app.get("/",(req, res)=>{
	//res.send('OK')
	//res.end('ok');
	//res.json({ success: true, id: 1000 })
	res.render('index')
})

app.get("/about",(req, res)=>{
	res.render('about')
})

app.post("/save",(req, res)=>{
	res.json({success: true, message: req.body.message})
})

app.get("/id/:idx",(req, res)=>{
	res.json({ success: true, id: req.params.idx })
})

app.post("/add",(req, res)=>{
	res.json({ success: true, id: req.body.idx })
})

const server = app.listen(4000,()=>{
	console.log('Server is running on port 4000')
})

const io = new Server(server)
io.on('connection', (socket) => {
	console.log('a user connected id='+socket.id );
	
	socket.on("save_message",(data)=>{
		console.log('on save message')
		io.emit("refresh_data",data)
	})
	
	socket.on("disconnect",()=>{
		console.log('a user disconnect');
	})
	
});

