require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./modal/User')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')


const app = express();





mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     UserModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json("success")
//                 } else {
//                     res.json('the password is incorrect')
//                 }
//             } else {
//                 res.json("No user Found with this Email address")
//             }
//         })
// })

// app.post('/register', (req, res) => {
//     UserModel.create(req.body)
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is working")
})
