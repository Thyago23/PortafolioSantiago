const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Usaremos tu correo institucional o personal según tu CV 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Santiago Cedeño' } // [cite: 1]
});

module.exports = mongoose.model('User', UserSchema);