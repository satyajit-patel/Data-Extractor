# PDF Data Extractor

This project is a simple PDF data extraction system designed to automatically extract specific details from a PDF (e.g., Name, Phone Number, Address) and populate them into a frontend form. 

## Live Demo
Check out the live demo here: <a href="https://data-extractor-git-master-satyajit-patels-projects.vercel.app/" target="_blank" rel="link">PDF Data Extractor</a>


## Features
- Upload PDF files from the frontend.
- Extract specific information (Name, Phone Number, Address) from the uploaded PDF.
- Automatically populate the extracted data into form fields.
- Uses a Node.js backend for processing and React with Tailwind CSS for the frontend.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, Multer, pdf-parse
- **Others**: Axios, CORS for communication between frontend and backend

## Steps to Run Locally
### Backend Setup
1. Navigate to the `Backend` folder:
```
cd Backend
npm install
node server.js
```
### Frontend Setup
1. Navigate to the `Frontend` folder:
```
cd Frontend
npm install
npm run dev
```