const Users = require('../models/users');
var jwt = require('jsonwebtoken');
const { secret } = require('./config');

class UserService {
    constructor() {}
        // get all the users
    async getUsers(req, res) {
            try {
                const user = await Users.query();
                return res.status(200).send(user);
            } catch (err) {
                res.send({
                    sucess: 0,
                    message: err
                });
            }
        }
        // add new user
    async createNewUser(req, res) {
        try {
            const newUser = req.body;
            const newuser = await Users.query().insert(newUser)
            console.log("try...")
            return res.status(201).send(newuser);
        } catch (err) {
            res.send({
                sucess: 0,
                message: "User is already exist"
            });
        }
    }
    async login(req, res) {
        try {
            console.log(req.body.email)
            const results = await Users.query().where('email', req.body.email);
            const { id, email, name, profile } = results[0];
            const userDetails = {
                id,
                name,
                email,
                profile
            }
            console.log(userDetails + "snm");
            if (!results[0]) {
                return res.send({
                    success: 0,
                    data: "Invalid email"
                });
            }
            const jsontoken = jwt.sign(
                userDetails,
                secret, { expiresIn: "1h" }
            )
            return res.send({
                success: 1,
                message: "login successfully",
                token: jsontoken
            })
        } catch (err) {
            return res.send({
                success: 0,
                data: err.message
            });
        }
    }

    async getUserById(decoded, req, res) {
        const id = req.params.id;
        const userData = await Users.query().findById(id);
        try {
            if (userData.email == decoded.email) {
                if (!userData) {
                    return res.status(404).send({ sucess: 0, message: "User not Found" })
                }
                return res.status(200).send(userData)
            } else {
                return res.send({
                    success: 0,
                    message: "Access Denied! Unauthorized User"
                });
            }
        } catch (err) {
            return res.status(400).send({ sucess: 0, error: err })
        }
    }

    async updateUser(req, res) {
        try {
            const updated_data = req.body;
            const update = await Users.query().findById(req.params.id).patch(updated_data);
            res.status(200).send({ sucess: 1, message: "updated successfully" });
        } catch (err) {
            return res.status(404).send(err);
        }
    }

    async tokenValidation(req, res) {
        try {
            const { token } = req.body;
            return await jwt.verify(token, secret, function(err, decoded) {
                console.log(decoded);
                return res.send(decoded);
            });



        } catch (err) {
            return res.status(400).send(err.message);
        }

    }

}

module.exports = UserService