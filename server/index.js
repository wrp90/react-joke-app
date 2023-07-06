const http = require('http');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { User, Joke } = require('./models');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001

require('dotenv').config({
    path:'../.env'
});

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: (orig, cb) => cb(null, true), credentials: true }));

app.post('/users', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await User.findOne({
        where: {
            userName: req.body.userName
        }
    });
    if (user) {
        res.send({
            message: "User name already in use"
        });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });
        res.send(newUser);
    };
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        const auth = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (auth) {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1hr',
                }
            );
            res.send({ token, user });
        } else {
            res.status(401).send({
                message: "Invalid password"
            });
        }
    } else {
        res.status(404).send({
            message: "No user found"
        })
    }
});

app.post('/jokes', async (req, res) => {
    const { joke, userId, category } = req.body;
    const savedJoke = await Joke.create({
        joke,
        userId,
        category,
    });
    res.send(savedJoke);
});

app.get('/user/:token', async (req, res) => {
    try {
        const decodedToken = req.params.token;
        jwt.verify(decodedToken, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                console.error(error);
                res.status(401).send({ message: "Invalid Token" });
            } else {
                const user = await User.findOne({
                    where: {
                        id: decoded.userId
                    }
                });
                res.send(user);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get('/jokes/:userId', async (req, res) => {
    const favJoke = await Joke.findAll({
        where: {
            userId: req.params.userId
        }
    });
    res.send(favJoke);
});

app.delete('/jokes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const joke = await Joke.findByPk(id);
        if (!joke) {
            res.status(404).json({ error: 'Joke not found' });
        } else {
            await joke.destroy();
            res.status(204).send(); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    };
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
