const userModel = require("../models/userModel");
const { oauth2client } = require("../utils/googleConfig");
const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query; // Get the authorization code from the query parameter

        // Exchange the authorization code for tokens
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);

        // Fetch user info using the access token
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;

        // Save or retrieve user from your database
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await userModel.create({
                name, email, image: picture
            });
        }

        // Generate a JWT token for your application
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT
        });

        return res.status(200).json({
            message: 'Success',
            token,
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

module.exports = { googleLogin };