# Physics Association Web Application

## Project Overview

This is a modern and interactive website for the Department of Physics, designed as part of the **Physics Association Web Application Project**.

The goal of this project is to present departmental data such as faculty profiles, research areas, labs, publications, student achievements, curriculum, and contact details — in a dynamic, visually clean, and responsive format.

Both the frontend and backend work seamlessly together. The contact form is fully integrated with **Google Sheets API** to store submissions, providing a real-world backend integration.

---

## Live Demo

(Add your deployment link here once hosted — e.g. Replit / Heroku / Render)

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
│ ├── contact_submissions.csv (optional)
│ └── ...
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
│ └── ...
└── README.md # Project overview (this file)


---

## Setup & Run Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo/physics-association.git
cd physics-association
