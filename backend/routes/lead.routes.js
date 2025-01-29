import { Router } from "express";
import { createLead, deleteLead, getLead, updateLead } from "../controllers/lead.controller.js";


const router = Router();


router.post('/leads', createLead);
router.get('/leads', getLead);
router.put('/leads/:leadId', updateLead);
router.delete('/leads/:leadId', deleteLead)

export default router;