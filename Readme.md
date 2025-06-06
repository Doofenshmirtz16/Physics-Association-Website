# Physics Association Web Application

## Project Overview

This is a modern and interactive website for the Department of Physics, designed as part of the **Physics Association Web Application Project**.

The goal of this project is to present departmental data such as faculty profiles, research areas, labs, publications, student achievements, curriculum, and contact details — in a dynamic, visually clean, and responsive format.

Both the frontend and backend work seamlessly together. The contact form is fully integrated with **Google Sheets API** to store submissions, providing a real-world backend integration.

---

## Live Demo

https://physics-association.onrender.com

---

## Key Features

✅ Responsive Home Page with Highlights and Announcements  
✅ About Us page (Department Overview)  
✅ Faculty Profiles with Search & Filter  
✅ Research Areas with Search & Graphical Bar Chart (Chart.js)  
✅ Publications with Search & Filter  
✅ Labs and Infrastructure page  
✅ Student Achievements  
✅ Curriculum and Course Structure  
✅ Contact Form with:
- Client-side validation
- Server-side validation
- Data storage in Google Sheets  
✅ Dynamic Routing via Flask  
✅ API endpoints for future extensibility  
✅ Neomorphic / Glassmorphism UI  
✅ Dark/Light Theme Toggle  
✅ Animations & Smooth Scroll Transitions  
✅ Mobile Responsive Design  

---

## Tech Stack

### Frontend

- HTML5
- CSS3 (Neomorphic/Glassmorphism styling)
- JavaScript (Vanilla)
- Chart.js (for graphical representation)

### Backend

- Python Flask
- Google Sheets API (gspread + google-auth)
- JSON (for static data)
- CSV (as fallback for contact submissions)

---

## Folder Structure

PhysicsWebsite/
│
├── app.py # Main Flask backend
├── requirements.txt # Python dependencies
├── credentials/ # Google Service Account JSON
│ └── credentials.json
├── data/ # JSON & CSV sample data
│ ├── faculty.json
│ ├── research.json
│ ├── labs.json
│ ├── contact_submissions.csv (given just for storing in database)
│ ├── achievemnets.json
│ ├── publications.json
│ ├── announcements.json
├── static/ # CSS, JS, Images
│ ├── css/
│ ├── js/
│ ├── images/
├── templates/ # HTML templates
│ ├── index.html
│ ├── faculty.html
│ ├── research.html
│ ├── publications.html
│ ├── contact.html
│ └── about.html
│ └── achievements.html
│ └── curriculum.html
│ └── labs.html
└── README.md

---

## 📄 Contact Form Data Storage
This project includes a Contact Form that stores user submissions in a Google Sheet using a backend integration via Google Cloud services.

### How It Works
The contact form on the website collects user inputs (Name, Email, Message).

Upon submission, the form sends the data to the backend.

The backend stores each submission as a new row in a connected Google Sheet.

This ensures persistent storage and easy review of contact form submissions.

#### Submitted Google Sheet
To allow verification of this functionality, the following resources are provided:

Google Sheet Link (View Only):https://docs.google.com/spreadsheets/d/1wavyKlHG4So13TdMUJyrdeQAZacylXZgHJHassvqiww/edit?usp=sharing

This link allows reviewers to verify that form submissions are being recorded in real-time.

#### Offline Export:
A CSV export of the Google Sheet is included in this project under:
data/contact_form_submissions.csv

This file contains a snapshot of the current data in the Google Sheet for offline review.

### Notes
No private keys or service account credentials are included in the submission for security reasons.

The backend uses authorized access to the Google Sheet through a secured service account.

If you wish to test live form submission, please contact the project author to enable write access temporarily.

---

## Setup & Run Instructions

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Doofenshmirtz16/Physics-Association-Website.git
cd Physics-Association-Website
```

## 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```
OR (generate yourself):
```
pip freeze > requirements.txt
```



