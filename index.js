const express = require('express');
const app = express();

const port = process.env.PORT || 6000;

app.use(express.json());

// Routes
app.get('/user', (req, res) => {
    res.send('Hello, World!');
});

app.post('/user/signin', (req, res) => {
    res.send('Sign in page');
});

app.post('/user/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // Perform database operations to create user in the database

    res.json({
        message: 'User created successfully',
        user: {
            username,
            email,
            password
        }
    });
});

app.get('/user/purchases', (req, res) => {
    res.send('User purchases page');
});

app.get('/course', (req, res) => {
    res.send('Course page');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
