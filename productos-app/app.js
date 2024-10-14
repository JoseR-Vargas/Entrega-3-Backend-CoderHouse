// app.js
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import exphbs from 'express-handlebars';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productos = []; 


const hbs = exphbs.create({
    defaultLayout: 'main', 
    layoutsDir: './views/layouts', 
    extname: '.handlebars', 
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    
    socket.emit('currentProducts', productos);

    
    socket.on('addProduct', (product) => {
        productos.push(product);
        io.emit('updateProducts', productos);
    });

    
   
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
