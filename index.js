const express = require('express');
const { userRouter} = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();
 
const port = process.env.PORT || 6000;

app.use(express.json());

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/course' , courseRouter);
app.use('/api/v1/admin' , adminRouter);

mongoose.connect()


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
