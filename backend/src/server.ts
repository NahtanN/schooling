import express from 'express';
import cors from 'cors';

import './database/connection';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (request, response) => {
    return response.json({ message: "Hello world" });
});

app.post('/article', (request, response) => {
    return response.json({ success: true })
})

app.listen(3333);