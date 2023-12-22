const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userInfo = require('./model/userModel')
const jwtsecretkey = 'HighlySecret'

router.post('/signUp', async (req, res) => {
    try {
        const { fullName, email, password, age, gender, mobile } = req.body
        const existingUser = await userInfo.findOne({ email })
        if (existingUser) {
            return res.json({
                status: 'User is already exist',
                data: null
            })
        }

        const bcryptPassword = await bcrypt.hash(password, 10)
        const user = await userInfo.insertMany({ fullName, email, password: bcryptPassword, age, gender, mobile })
        const token = jwt.sign({ userId: user._id }, jwtsecretkey, {
            expiresIn: '7d'
        })
        return res.json({
            status: 'SignUp is successful',
            password: bcryptPassword,
            data: {
                token
            }
        })
    }

    catch (error) {
        return res.json({
            status: 'Fail to create the new user',
            message: error.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userInfo.findOne({ email })
        if (user) {
            const passwordMatched = await bcrypt.compare(password, user.password)

            if (passwordMatched) {
                const jwtToken = jwt.sign(user.toJSON(), 'highlyCridentialSecurtyToken', { expiresIn: 60 })
                return res.json({
                    status: 'success the user login',
                    jwtToken
                })
            }
            else {
                return res.json({
                    status: 'Fail to logic'
                })
            }

        }
        else {
            return res.json({
                status: 'Fail to user login try again'
            })
        }

    }
    catch (error) {
        return res.json({
            status: 'Fail to user login',
            message: error.message
        })
    }
})

module.exports = router