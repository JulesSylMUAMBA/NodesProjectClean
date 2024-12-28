import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import pool from '../db';

const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 */
router.post('/upload', (req: Request, res: Response) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${req.headers['file-name'] || 'uploaded-file'}`;
    const filePath = path.join(uploadDir, fileName);

    const fileStream = fs.createWriteStream(filePath);
    req.pipe(fileStream);

    fileStream.on('finish', () => {
        res.status(200).json({ message: 'File uploaded successfully', filePath });
    });

    fileStream.on('error', (err) => {
        console.error('File upload error:', err);
        res.status(500).send('File upload error.');
    });
});

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     description: Retrieve all players from the database.
 *     responses:
 *       200:
 *         description: List of players.
 */
router.get('/players', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM players');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving players:', err);
        res.status(500).send('Error retrieving players.');
    }
});

/**
 * @swagger
 * /vote:
 *   post:
 *     summary: Vote for a player
 *     description: Submit a vote for a specific player.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *                 description: ID of the player to vote for.
 *               userId:
 *                 type: integer
 *                 description: ID of the user submitting the vote.
 *     responses:
 *       200:
 *         description: Vote registered successfully.
 */
router.post('/vote', async (req: Request, res: Response) => {
    const { playerId, userId } = req.body;

    if (!userId) {
        return res.status(401).send('Unauthorized user.');
    }

    if (!playerId) {
        return res.status(400).send('Player ID is required.');
    }

    try {
        const checkVote = await pool.query('SELECT * FROM votes WHERE user_id = $1', [userId]);
        if (checkVote.rows.length > 0) {
            return res.status(403).send('You have already voted.');
        }

        await pool.query('INSERT INTO votes (user_id, player_id) VALUES ($1, $2)', [userId, playerId]);
        await pool.query('UPDATE players SET votes = votes + 1 WHERE id = $1', [playerId]);

        res.status(200).send('Vote registered successfully.');
    } catch (err) {
        console.error('Error registering vote:', err);
        res.status(500).send('Error registering vote.');
    }
});

/**
 * @swagger
 * /winners:
 *   get:
 *     summary: Get all winners
 *     description: Retrieve the list of winners.
 *     responses:
 *       200:
 *         description: List of winners.
 */
router.get('/winners', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT year, player_name AS name, photo_url AS image FROM winners ORDER BY year DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving winners:', err);
        res.status(500).send('Error retrieving winners.');
    }
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for players or winners
 *     description: Search for players or winners based on criteria.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the player or winner.
 *       - in: query
 *         name: club
 *         schema:
 *           type: string
 *         description: Club of the player or winner.
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year of the winner.
 *     responses:
 *       200:
 *         description: Search results.
 */
router.get('/search', async (req: Request, res: Response) => {
    const { name, club, year } = req.query;

    let playerQuery = 'SELECT * FROM players WHERE 1=1';
    let winnerQuery = 'SELECT * FROM winners WHERE 1=1';

    const playerParams: string[] = [];
    const winnerParams: string[] = [];

    if (name) {
        playerParams.push(`%${name}%`);
        winnerParams.push(`%${name}%`);
        playerQuery += ` AND name ILIKE $${playerParams.length}`;
        winnerQuery += ` AND player_name ILIKE $${winnerParams.length}`;
    }
    if (club) {
        playerParams.push(`%${club}%`);
        winnerParams.push(`%${club}%`);
        playerQuery += ` AND club ILIKE $${playerParams.length}`;
        winnerQuery += ` AND club ILIKE $${winnerParams.length}`;
    }
    if (year) {
        winnerParams.push(year as string);
        winnerQuery += ` AND year = $${winnerParams.length}`;
    }

    try {
        let playerResult = { rows: [] };
        if (!year) {
            playerResult = await pool.query(playerQuery, playerParams);
        }
        const winnerResult = await pool.query(winnerQuery, winnerParams);

        res.json({
            players: playerResult.rows,
            winners: winnerResult.rows,
        });
    } catch (err) {
        console.error('Error during search:', err);
        res.status(500).send('Search error.');
    }
});

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve user profile by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: User profile data.
 */
router.get('/profile/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userResult = await pool.query('SELECT name, favorite_club FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found.');
        }

        const votesResult = await pool.query('SELECT COUNT(*) AS vote_count FROM votes WHERE user_id = $1', [id]);
        const voteCount = votesResult.rows[0]?.vote_count || 0;

        res.json({
            name: userResult.rows[0].name,
            favorite_club: userResult.rows[0].favorite_club,
            vote_count: parseInt(voteCount, 10),
        });
    } catch (err) {
        console.error('Error retrieving profile:', err);
        res.status(500).send('Error retrieving profile.');
    }
});

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Username of the new user.
 *               password:
 *                 type: string
 *                 description: Password of the new user.
 *               favorite_club:
 *                 type: string
 *                 description: Favorite club of the user (optional).
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/signup', async (req: Request, res: Response) => {
    const { name, password, favorite_club } = req.body;

    if (!name || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, password, favorite_club) VALUES ($1, $2, $3) RETURNING *',
            [name, password, favorite_club || null]
        );
        res.status(201).json({ message: 'User created successfully.', user: result.rows[0] });
    } catch (err) {
        console.error('Error during sign-up:', err);
        res.status(500).send('Sign-up error.');
    }
});

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     description: Authenticate a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Username of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 */
router.post('/signin', async (req: Request, res: Response) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE name = $1 AND password = $2',
            [name, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).send('Invalid username or password.');
        }

        res.json({ message: 'User authenticated successfully.', user: result.rows[0] });
    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).send('Sign-in error.');
    }
});

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get voting results
 *     description: Retrieve voting results.
 *     responses:
 *       200:
 *         description: Voting results.
 */
router.get('/results', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT id, name, club, votes FROM players ORDER BY votes DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving results:', err);
        res.status(500).send('Error retrieving results.');
    }
});

export default router;
