import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express + TypeScript 👋' });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
