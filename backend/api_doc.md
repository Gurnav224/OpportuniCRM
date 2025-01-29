# 📌 OportuniCRM API Documentation

## 📝 Lead Management API

This API allows you to **create, retrieve, update, and delete** leads.

---

## 🚀 Endpoints

### **1️⃣ Create a New Lead**
**📌 Endpoint:**  
`POST /leads`

**📩 Request Body (JSON)**
```json
{
  "name": "Acme Corp",
  "source": "Referral",
  "salesAgent": "64c34512f7a60e36df44",
  "status": "New",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High"
}
``` 

**✅ Response (201 - Created)**


```json
{
  "_id": "6799f73b05fe1c727f14c731",
  "name": "Acme Corp",
  "source": "Referral",
  "salesAgent": "64c34512f7a60e36df44",
  "status": "New",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High",
  "createdAt": "2025-01-29T09:39:07.966Z",
  "updatedAt": "2025-01-29T09:39:07.967Z",
  "__v": 0
}
```

### **2️⃣ Get All Leads**

**📌 Endpoint:**
`GET /leads`

**✅ Response (200 - OK)**

```json
[
  {
    "_id": "6799f73b05fe1c727f14c731",
    "name": "Acme Corp",
    "source": "Referral",
    "salesAgent": "6799e93a3f507c3e8ddb8d3e",
    "status": "New",
    "tags": ["High Value", "Follow-up"],
    "timeToClose": 30,
    "priority": "High",
    "createdAt": "2025-01-29T09:39:07.966Z",
    "updatedAt": "2025-01-29T09:39:07.967Z",
    "__v": 0
  },
  {
    "_id": "6799fa6d16bc119967ea708f",
    "name": "Acme Corp",
    "source": "Referral",
    "salesAgent": "6799e93a3f507c3e8ddb8d3e",
    "status": "New",
    "tags": ["High Value", "Follow-up"],
    "timeToClose": 30,
    "priority": "High",
    "createdAt": "2025-01-29T09:52:45.086Z",
    "updatedAt": "2025-01-29T09:52:45.091Z",
    "__v": 0
  }
]
```


### **3️⃣ Update a Lead**

**📌 Endpoint:**
`PUT /leads/:leadId`

**📩 Request Body (JSON)**
```json
{
  "name": "Quick Seller",
  "source": "Website",
  "salesAgent": "6799e606c9e8b48644068df2",
  "status": "Contacted",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High"
}
```

**✅ Response (200 - OK)**

```json
{
  "_id": "6799f73b05fe1c727f14c731",
  "name": "Quick Seller",
  "source": "Website",
  "salesAgent": "6799e606c9e8b48644068df2",
  "status": "Contacted",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High",
  "createdAt": "2025-01-29T09:39:07.966Z",
  "updatedAt": "2025-01-29T09:39:07.967Z",
  "__v": 0
}
```

### **4️⃣ Delete a Lead**

**📌 Endpoint:**
`DELETE /leads/:leadId`

**✅ Response (200 - OK)**
```json
{
  "message": "Lead deleted successfully"
}
```


## 🛠️ Error Handling

| Status Code | Meaning        | Example Response |
|------------|---------------|------------------|
| **400**    | Bad Request    | ```json { "error": "Invalid input" } ``` |
| **404**    | Not Found      | ```json { "error": "Resource not found" } ``` |
| **409**    | Conflict       | ```json { "error": "Duplicate entry detected" } ``` |
| **500**    | Server Error   | ```json { "error": "Internal server error" } ``` |

