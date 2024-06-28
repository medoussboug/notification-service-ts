import express from 'express';

const app = express();

app.use(express.json());

export const startServer = async () => {
    app.listen(3000, () => {
        console.info('Server is running on port 3000');
    });
};
