---

# Bharat FD FAQ Web App Backend 

## Overview

This project is a **FAQ Management API** that supports **multi-language translations** using `googletrans`. It allows users to **create, read, update, and delete FAQs**, while providing real-time translations in different languages. The system uses **Redis caching** for optimized performance.

---

## Tech Stack

| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime for server-side logic |
| **Express.js** | Web framework for handling API requests |
| **MongoDB** | NoSQL database for storing FAQs |
| **Mongoose** | ODM for MongoDB interaction |
| **Redis** | In-memory caching for performance optimization |
| **googletrans** | Library for translating FAQs dynamically |
| **Mocha & Chai** | Testing framework for API validation |

---

## Features

 **Multi-language Support** using `googletrans`  
 **CRUD operations** for FAQ management  
 **Redis caching** for better performance  
 **Unit Testing** with Mocha,Chai & SuperTest  
 **Mongoose ODM** for MongoDB interaction  

---

##  Folder Structure

|  Directory/File      | Description |
|----------------------|--------------|
| `config/Db.Connect.js` | MongoDB connection setup |
| `config/RedisConfig.js` | Redis client setup for caching |
| `controllers/FAQ.js` | Logic for handling FAQ requests |
| `models/FAQ.js` | Mongoose schema for FAQs |
| `routes/Faqroutes.js` | Express routes for FAQ API |
| `testing/Chai.js` | Unit tests using Mocha & Chai |
| `utils/Translate.js` | Translation utility using `googletrans` |
| `.env` | Environment variables |
| `server.js` | Main entry point of the application |

---

## Installation & Setup

### Prerequisites

- **Node.js** 
- **MongoDB** 
- **Redis** (For caching)

### Setup Steps

**Clone the repository**
   ```sh
   git clone https://github.com/AtulGarg2204/bharatfd_assignment-faq.git
   cd bharat-fd-assignment
   ```

**Install dependencies**
   ```sh
   npm install
   ```

**Set up environment variables** (`.env` file)
   ```
   MONGO_URI=your_mongodb_connection_string
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

**Run the application**
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:8080`

---

## API Endpoints

### **Create a FAQ**
```http
POST /Faqs/postfaq
```
**Request Body:**
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a runtime environment that allows you to run JavaScript on the server side.",
  "targetLanguage": "hi"
}
```
**Response:**
```json
{
  "message": "Faq Created Successfully",
  "faq": {
    "_id": "64b6a3d6e98f67a3d",
    "question": "What is Node.js?",
    "answer": "Node.js is a runtime environment that allows you to run JavaScript on the server side."
  }
}
```

---

### **Fetch FAQs (With Translations)**
```http
GET /Faqs?targetLanguage=hi
```
**Response:**
```json
{
  "translatedFaqs": [
    {
      "_id": "64b6a3d6e98f67a3d",
      "question": "Node.js क्या है?",
      "answer": "Node.js एक रनटाइम वातावरण है जो आपको सर्वर साइड पर जावास्क्रिप्ट चलाने की अनुमति देता है।"
    }
  ]
}
```

---

### **Update a FAQ**
```http
PUT /Faqs/:id
```
**Request Body:**
```json
{
  "question": "What is Node.js in detail?",
  "answer": "It is built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model, making it lightweight and efficient.",
  "targetLanguage": "hi"
}
```
**Response:**
```json
{
  "message": "Successfully Updated Faq",
  "UpdatedFAQ": {
    "question": "What is Node.js in detail?",
    "answer": "It is built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model, making it lightweight and efficient."
  }
}
```

---

### **Delete a FAQ**
```http
DELETE /Faqs/:id
```
**Response:**
```json
{
  "message": "Faq Deleted"
}
```

---

## Running Tests
To run unit tests:
```sh
npm test
```

---

## Author
  Atul Garg  

---

---
