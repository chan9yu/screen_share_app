import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3036;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, Screen Share App!');
});

app.listen(PORT, () => {
	console.log(`✅ Screen Share App is ready and listening on: http://localhost:${PORT}`);
});
