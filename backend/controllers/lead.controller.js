import mongoose from "mongoose";
import { Agent } from "../models/agents.model.js";
import { Lead } from "../models/leads.model.js";

export const createLead = async (req, res) => {
  const { name, source, salesAgent, status, tags, timeToClose, priority } =
    req.body;

  const requiredFields = [
    "name",
    "source",
    "salesAgent",
    "status",
    "tags",
    "timeToClose",
    "priority",
  ];

  try {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ error: `Invalid input: ${field} is required` });
      }
    }

    if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
      return res.status(400).json({ error: "Invalid sales agent ObjectId" });
    }

    const agent = await Agent.findById({ _id: salesAgent });

    if (!agent) {
      return res
        .status(404)
        .json({ error: `Sales agent with ID ${salesAgent} not found.` });
    }

    const lead = new Lead({
      name,
      source,
      salesAgent,
      tags,
      status,
      timeToClose,
      priority,
    });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error("failed to create new lead", error);
    res.status(500).json({ error: "server error" });
  }
};

export const getLead = async (req, res) => {
  const query = {};
  const { sortBy, salesAgent, status, source, name, order , tag, priority } = req.query;

  console.log(req.query)
  if (salesAgent && !mongoose.Types.ObjectId.isValid(salesAgent)) {
    return res
      .status(400)
      .json({ error: "salesAgent must be a valid ObjectId" });
  }

  if (
    status &&
    !["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].includes(
      status
    )
  ) {
    return res.status(400).json({
      error: `Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].`,
    });
  }

  if (
    source &&
    ![
      "Website",
      "Referral",
      "Cold Call",
      "Advertisement",
      "Email",
      "Other",
    ].includes(source)
  ) {
    return res.status(400).json({
      error: `Invalid input: 'source' must be one of [ "Website" , "Referral" , "Cold Call" , "Advertisement" , "Email" , "Other" ,].`,
    });
  }

  if (salesAgent) {
    query.salesAgent = salesAgent;
  }

  if (status) {
    query.status = status;
  }
  if(tag){
    query.tags = tag;
  }

  if(source){
    query.source = source;
  }

  if (name) {
    const agent = await Agent.findOne({ name });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    query.salesAgent = agent._id;
  }

  if(priority){
    query.priority = priority
  }



  let sortQuery = {};

  if (sortBy === "timeToClose") {
    const sortOrder = order === "desc" ? -1 : 1;
    sortQuery.timeToClose = sortOrder;
  }

  const sortOrder = order === "desc" ? -1 : 1;

  try {
    const leads = await Lead.find(query).populate("salesAgent").sort(sortQuery);

    if (sortBy === "priority") {
      // Map each priority to a numeric value
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      leads.sort((a, b) => {
        const aVal = priorityMap[a.priority] || 4;
        const bVal = priorityMap[b.priority] || 4;
        return sortOrder * (aVal - bVal);
      });
    } else if (sortBy) {
      // For other fields, use default sorting (or a custom sort function if needed)
      leads.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -sortOrder;
        if (a[sortBy] > b[sortBy]) return sortOrder;
        return 0;
      });
    }

    res.status(200).json(leads);
  } catch (error) {
    console.error("error failed to get the all leads", error);
    res.status(500).json({ error: "server error" });
  }
};

export const getLeadById = async (req, res) => {
  const { leadId } = req.params;
  console.log(leadId);
  try {
    const lead = await Lead.findById({ _id: leadId }).populate("salesAgent");
    res.status(200).json(lead);
  } catch (error) {
    console.error("failed to get lead by id", error);
    res.status(500).json({ error: "server error" });
  }
};

export const updateLead = async (req, res) => {
  const { leadId } = req.params;
  const { name, source, salesAgent, status, tags, timeToClose, priority } =
    req.body;

  const requiredFields = [
    "name",
    "source",
    "salesAgent",
    "status",
    "tags",
    "timeToClose",
    "priority",
  ];

  try {
    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      return res.status(400).json({ error: "Lead Id Must be valid" });
    }

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ error: `Invalid input: ${field} is required` });
      }
    }

    const agent = await Agent.findById(salesAgent);

    if (!agent) {
      return res
        .status(404)
        .json({ error: `Sales agent with ID ${salesAgent} not found.` });
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: leadId },
      {
        name,
        source,
        salesAgent,
        status,
        tags,
        timeToClose,
        priority,
      },
      { new: true }
    );

    res.status(200).json(lead);
  } catch (error) {
    console.error("error to update lead", error);
    res.status(500).json({ error: "server error" });
  }
};

export const deleteLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      return res.status(400).json({ error: "Lead Id Must be valid" });
    }

    const lead = await Lead.findByIdAndDelete(leadId);

    if (!lead) {
      return res
        .status(404)
        .json({ error: `Lead with ID ${leadId} not found.` });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("failed to delete the lead", error);
    res.status(500).json({ error: "server error" });
  }
};
