import { Agent } from "../models/agents.model.js";


function isValidEmail(email){
    const atIndex  = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    return atIndex > 0 && dotIndex > atIndex +1 && dotIndex < email.length -1
}

export const createAgent = async (req, res) => {
  const { name, email } = req.body;

  const requiredFields = ["name", "email"];


  try {

    for(let field of requiredFields){
        if(!req.body[field]){
            return res.status(400).json({error:`Invalid input: ${field} are required.`})
        }
    }

    if (!isValidEmail(email)  ) {
      return res.status(400).json({ error: `Invalid input: email  must be a valid email address.`});
    }
    const isExists = await Agent.findOne({ email });
    if (isExists) {
      return res.status(409).json({ error:`Sales agent with email ${email} already exists.` });
    }
    const agent = new Agent({ name, email });
    await agent.save()
    res.status(201).json(agent);
  } catch (error) {
    console.error("failed to create new agent", error);
    res.status(500).json({error:error.message})
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.status(200).json(agents);
  } catch (error) {
    console.error("failed to get agents", error);
  }
};
