import { Router } from "express";
import { createAgent, getAgents } from "../controllers/agent.controller.js";


const router = Router();

router.post('/agents', createAgent);
router.get('/agents', getAgents);


export default router;