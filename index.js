const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const {connectToMongoDB} = require('./src/middleware/dbconnection');
const { APP_PORT } = require('./src/config');
const PORT = APP_PORT;

const app = express();
app.use(cors({
  origin: '*',
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB();

app.use('/api', route);

app.listen(PORT, (error)=>{
    {
    if (!error)
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    else
        console.log('Error occurred', error);
}
})


