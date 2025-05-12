import express from 'express';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
