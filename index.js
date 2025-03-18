const express = require('express');
const { userRouter} = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();
 
const port = process.env.PORT || 6000;

app.use(express.json());

app.use('/user' , userRouter);
app.use('/course' , courseRouter);
app.use('/admin' , adminRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
