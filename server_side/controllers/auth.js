const router = require('express').Router()
const bcrypt = require('bcrypt')
const UserAuth = require('../models/auth/userAuth.js')

// Password hassing
const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

// REGISTER ENDPOINT
router.post("/register", async (req, res) => {
    const user_password = generateHash(req.body.password)

    try {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password_digest: user_password
        }

        UserAuth
            .create(newUser)
            .then(dbRes => res.status(200).json(newUser))

    } catch(err) {
        res.status(500).json(err)
    }
})

// LOGIN ENDPOINT
router.post("/login", async (req, res) => {
    try {
        const user = await UserAuth.findUser( req.body.email )
        
        if (user.rows.length === 0) return res.status(404).send("email does not exist")

        const validPassword = await bcrypt.compare(req.body.password, user.rows[0].password_digest)
        if (!validPassword) return res.status(400).json("incorrect credentials")

        res.status(200).json(user.rows)
    } catch(err) {
        res.status(404).json(err)
    }
})

module.exports = router