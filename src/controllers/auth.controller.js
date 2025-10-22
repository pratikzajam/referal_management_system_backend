import jwt from 'jsonwebtoken';
import owasp from 'owasp-password-strength-test';
import bcrypt from "bcryptjs";
import User from '../models/user.model.js'
import validator from 'validator';

export let signup = async (req, res) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        name = name.trim();
        email = email.trim();
        password = password.trim();
        confirmPassword = confirmPassword.trim();

        let isEmailValid = validator.isEmail(email);

        if (!isEmailValid) {
            return res.status(409).json({
                status: false,
                message: "Please Enter A Valid Email",
                data: null
            })
        }

        let isEmailExists = await User.findOne({ email: email });

        if (isEmailExists) {
            return res.status(409).json({
                status: false,
                message: "Your Account Allready Exists",
                data: null
            })
        }

        if (password != confirmPassword) {
            return res.status(404).json({
                status: false,
                message: "Password And Current Password Does Not Match",
                data: null
            })
        }


        if (password.length < 8) {
            return res.status(404).json({
                status: false,
                message: "password must be at least 8 characters long",
                data: null
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        let user = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await user.save()



        if (user._id) {

            let userData = user.toJSON()

            delete userData.password
            delete userData.createdAt;
            delete userData.updatedAt;
            delete userData.__v;

            return res.status(200).json({
                status: true,
                message: "User signup Sucessfully",
                data: userData
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Something Went Wrong While Signup",
                data: user
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}



export let login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(201).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        email = email.trim();
        password = password.trim();

        let userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(409).json({
                status: false,
                message: "No User Found For This Email Address",
                data: null
            })
        }

        let isPasswordMatch = bcrypt.compareSync(password, userData.password);


        if (!isPasswordMatch) {
            return res.status(409).json({
                status: false,
                message: "Username And Password Does Not Match",
                data: null
            })
        } else {

            let token = jwt.sign({ id: userData._id, name: userData.name, email: userData.email }, process.env.SECRET_KEY);

            const isProduction = process.env.NODE_ENV === "production";

            console.log(isProduction)

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,         
                sameSite: "Lax",      
                maxAge: 24 * 60 * 60 * 1000,
                path: "/",          
            });
            let user = userData

            return res.status(200).json({
                status: true,
                message: "Logged In Sucessfully",
                data: userData
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}










