const jwt = require('jsonwebtoken');
const UserModel = require('../modal/User');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log('token', token);
        res.json({ token, userId: user._id, userName: user.name });
    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: " This email already register" })
        }

        user = new UserModel({ name, email, password })
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("error in register Api", error);
        res.status(500).json({ error: "Server error" });
    }
}