import express from 'express';
import { sendRequest } from '../Controllers/friends.js';

const router = express.Router();

router.post("/",sendRequest);

export default router;