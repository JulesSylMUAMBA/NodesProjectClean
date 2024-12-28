import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/candidates', (req: Request, res: Response) => {
    res.send('Liste des candidats');
});

export default router;
