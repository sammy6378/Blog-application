import {app} from './app';
require('dotenv').config();
import 'dotenv/config'
import connectDB from './utils/db';
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
})