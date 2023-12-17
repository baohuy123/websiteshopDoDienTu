const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');

const database = require('./configs/database.js');

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const productRoute = require('./routes/v1/product.router.js');
const accountRoute = require('./routes/v1/account.router.js');
const customerRoute = require('./routes/v1/customer.router.js');
const cartRoute = require('./routes/v1/cart.router.js');

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.send("API WEB");
});

//SSE
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const intervalId = setInterval(() => {
        res.write(': ping\n\n');
    }, 30000);
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

// ROUTE API
app.use('/v1/products', productRoute);
app.use('/v1/accounts', accountRoute);
app.use('/v1/carts', cartRoute);
app.use('/v1/customer', customerRoute);

server.listen(port, async () => {
    try {
        const result = await database.connect();
        if (result) {
            console.log('Kết nối thành công đến MYSQL');
        } else {
            console.log('Kết nối thất bại đến Database');
        }

        console.log(`Máy chủ chạy PORT: ${port}`);
    } catch (error) {
        console.error('Máy chủ bị lỗi:', error);
    }
});
