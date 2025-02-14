const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Crear app express
const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/contactMessages', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Crear un esquema para el mensaje
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(bodyParser.json());

// Ruta para recibir los mensajes
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.json({ message: 'Mensaje recibido exitosamente.' });
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
