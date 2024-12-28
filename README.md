# **NodesProject**

### **Table of Contents**
1. [Introduction](#introduction)
2. [Demo](#demo)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [Features](#features)
7. [Screenshots](#screenshots)
8. [Database Setup](#database-setup)
9. [Swagger Documentation](#swagger-documentation)
10. [Acknowledgments](#acknowledgments)

---

### **Introduction**
This project implements a web application for voting for ballon d'or and checcking Ballon d'Or statistics, including players, winners, and their profiles. The application features a frontend built with React (TypeScript) and a backend powered by Node.js (TypeScript) and PostgreSQL.

---

### **Demo**
You can watch the project demo here:

[![Demo Video](https://img.youtube.com/vi/iLyPX8JNncc/0.jpg)](https://youtu.be/iLyPX8JNncc)

---

### **Project Structure**
The repository contains the following directories:
- `frontend/` – Contains the React frontend code.
- `backend/` – Contains the Node.js backend code.

---

### **Technologies Used**
- **Frontend**: React, Vite, TypeScript, HighCharts, ag-grid.
- **Backend**: Node.js, TypeScript, Swagger (OpenAPI).
- **Database**: PostgreSQL.
- **Others**: Bootstrap (for styling).

---

### **Setup Instructions**

#### **Frontend**
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### **Backend**
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```
   The Swagger documentation will be available at `http://localhost:3000/api-docs`.

---

### **Features**
1. **CRUD Operations**:
   - Create, Read, Update, Delete functionality for players and winners.
2. **Swagger Integration**:
   - OpenAPI documentation for all backend endpoints.
3. **PostgreSQL Database**:
   - Relational database storing player and winner data.

---

### **Screenshots**
Include screenshots of key pages (ag-grid, HighCharts, etc.) to illustrate functionality. Example:

- **Homepage**: 
![image](https://github.com/user-attachments/assets/e89a3764-e32a-43fc-ab33-ff1c6d4f4367)

![image](https://github.com/user-attachments/assets/883f4ef2-d30a-4728-abc7-50a8f7afebcc)

![image](https://github.com/user-attachments/assets/e62c4679-0a3b-4043-b402-03f42b6de405)

![image](https://github.com/user-attachments/assets/e0efb36f-78ed-46ae-9ed2-825290a6004d)




- **Swagger API Documentation**: 
 ![image](https://github.com/user-attachments/assets/2ecb82cb-1b36-4a26-9f15-9a74a3c6f59a)

![image](https://github.com/user-attachments/assets/055d9cb7-6112-4adf-9b93-cc162ce270dd)

![image](https://github.com/user-attachments/assets/3979b51a-29d4-465f-b8db-a86bf76e565b)

![image](https://github.com/user-attachments/assets/5d164337-c9b6-4c5b-b13c-afea5f8b4923)

![image](https://github.com/user-attachments/assets/a0f027a8-2fc5-489d-8fc3-3b69a63741ac)

![image](https://github.com/user-attachments/assets/647adfbc-ef99-4b62-9f2b-f4480b204124)

![image](https://github.com/user-attachments/assets/8a9ab960-aacc-4b06-88a0-1261c59451ff)

![image](https://github.com/user-attachments/assets/388cdd63-71ff-4b9e-921a-ff51c4bac908)


---

### **Database Setup**
1. Ensure PostgreSQL is installed and running on port **5432**.
2. Use the following credentials:
   - **Username**: `postgres`
   - **Password**: `B@ll0nD0r2024!`
3. Execute the `backend/init.sql` script to create the required tables and insert mock data:
   ```bash
   psql -U postgres -f backend/init.sql
   ```

---

### **Swagger Documentation**
Access Swagger documentation at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

### **Acknowledgments**
This project was developed as part of the ESILV course requirements.
