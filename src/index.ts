import express from 'express';
import { json } from 'body-parser';
import { app } from './app';

const PORT = process.env.PORT || 3000;

const server = express();
server.use(json());

app(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});