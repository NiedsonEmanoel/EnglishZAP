const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Databases = require('./Databases');
const Routes = require('./Routes');

if (process.env.MODE) {
    console.log('Production')
} else {
    console.log('Development')
    require('dotenv').config();
}

(() => {
    Databases.MongoDB.Connect();
})();

app.use(cors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'PUT, POST, PATCH, DELETE, GET'
}));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', Routes.api);
app.use('/webhooks', Routes.webhooks);

app.get('/*', Routes.main)

app.use(Routes.listeners.notFound);
app.use(Routes.listeners.error)

let port = process.env.PORT || 3001

server.listen(port, () => { console.log(`Working on: http://localhost:${port}`) })

io.on('connection', function (client) {
    console.log('New socket:', client.id);
})

exports.emit = (event, data) => {
    return (io.emit(event, data));
}