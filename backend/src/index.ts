import express, { Application } from 'express';
import cors from 'cors';
import dbRoutes from './routes/dbRoutes';
import { swaggerUi, swaggerSpec } from './swaggerConfig';

const app: Application = express();

app.use(cors());
app.use(express.json());


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/db', dbRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api/docs`);
});
