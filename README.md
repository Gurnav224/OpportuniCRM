# OpportuniCRM

OpportuniCRM is a Customer Relationship Management (CRM) platform designed to help businesses manage their sales pipeline, customer interactions, and growth opportunities efficiently. It focuses on enhancing business relationships, improving customer retention, and driving sales by streamlining workflows and providing actionable insights.

Built with a React frontend, Express/Node backend, MongoDB database

---

## Demo Link

[Live Demo](https://opportuni-crm-dvtp.vercel.app/)  

---

## Quick Start

```
git clone https://github.com/Gurnav224/OpportuniCRM.git


cd backend
npm install
npm run dev     

cd frontend
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- TailwindCss

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://youtu.be/EgqTYD6nnTg?si=U5cxkQBBJawBTtUC)

## Features

**Home**

- all leads list
- leads counts by status
- leads filter by status
- add new lead

**Leads**

- All leads list
- filter by status, sales agent, tag, source,
- sort by priority, Time to close
- add new lead

**Leads By Status**

- filter by staus
- filter by sales agent, priority
- sort by time to close

**Agents**

- all Agent List
- create new Agent

**Report**

Report Overview

- a chart showing total closed leads and in pipeline
- leads closed by sales agent
- Lead Distribution by Status:


## API Reference

### **GET	/api/leads**<br>	 
List all leads<br>	 
Sample Response:<br>

```json
[
    {
        "_id": "67c2e0cf4190c6740670bd02",
        "name": "lead 1 updated",
        "source": "Website",
        "salesAgent": {
            "_id": "67c2dfcc289b3ce7a69efeaf",
            "name": "agent1",
            "email": "agent1@gmail.com",
            "createdAt": "2025-03-01T10:22:04.549Z",
            "__v": 0
        },
        "status": "Closed",
        "tags": [
            "FollowUp"
        ],
        "timeToClose": 23,
        "priority": "High",
        "createdAt": "2025-03-01T10:26:23.911Z",
        "updatedAt": "2025-03-01T10:26:23.912Z",
        "__v": 0
    },
]
```

### **GET	/api/leads/:id**<br>	 	
Get details for one lead<br>		

```json
  {
        "_id": "67c2e0cf4190c6740670bd02",
        "name": "lead 1 updated",
        "source": "Website",
        "salesAgent": {
            "_id": "67c2dfcc289b3ce7a69efeaf",
            "name": "agent1",
            "email": "agent1@gmail.com",
            "createdAt": "2025-03-01T10:22:04.549Z",
            "__v": 0
        },
        "status": "Closed",
        "tags": [
            "FollowUp"
        ],
        "timeToClose": 23,
        "priority": "High",
        "createdAt": "2025-03-01T10:26:23.911Z",
        "updatedAt": "2025-03-01T10:26:23.912Z",
        "__v": 0
    },
```

    
  ### **POST	/api/leads**<br> 	
Create a new lead<br>	
Sample Response:<br>
```{name , source, salesAgent }```



## Contact
For bugs or feature requests, please reach out to  chaudharyg856@gmai.com