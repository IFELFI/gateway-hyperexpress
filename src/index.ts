import HyperExpress from 'hyper-express';
import { authenticate } from './middlewares/auth.middleware';

const app = new HyperExpress.Server();

const port = parseInt(process.env.PORT as string) || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(authenticate);

app
  .listen(port)
  .then(() => {
    console.log(`Server is running on http://localhost:${port}`);
  })
  .catch((err) => {
    console.error(err);
  });
