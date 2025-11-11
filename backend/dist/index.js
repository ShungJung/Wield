"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express + TypeScript 👋' });
});
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
