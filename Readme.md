# Physics Association Web Application

## Project Overview

This is a modern and interactive website for the Department of Physics, designed as part of the **Physics Association Web Application Project**.

The goal of this project is to present departmental data such as faculty profiles, research areas, labs, publications, student achievements, curriculum, and contact details — in a dynamic, visually clean, and responsive format.

Both the frontend and backend work seamlessly together. The contact form is fully integrated with **Google Sheets API** to store submissions, providing a real-world backend integration.
(Google Sheets can be used in the backend to store data for other html pages as well but just for demonstration, I have used JSON to store static data for other pages and Google Sheets for dynamic data.)

---

## Live Demo

Link to the demo video for walkthrough over the website:
[Demo Video](https://drive.google.com/file/d/169lLGHvmk2QamYJ_tLzPbt55_1N9dpJS/view?usp=sharing)

(Live hosted website link on render) 
https://physics-association.onrender.com

#### Screenshots of Website:

##### Render Page
![Screenshot (21)](https://github.com/user-attachments/assets/24371eaa-918b-43a7-b5a6-27cbbee39388) 

##### Home Page
![Screenshot (22)](https://github.com/user-attachments/assets/7dadb2eb-8d3c-46e8-b4c7-13bb162b3371)

##### Curriculum Page
![Screenshot (23)](https://github.com/user-attachments/assets/d5511e85-a5d1-42e6-b6e6-98ec96f7b3be)


---


## Key Features

✅ Responsive Home Page with Highlights and Announcements  
✅ About Us page (Department Overview)  
✅ Faculty Profiles with Search & Filter  
✅ Research Areas with Search & Graphical Bar Chart (Chart.js)  
✅ Publications with Search & Filter  
✅ Labs and Infrastructure page with Search & Filter  
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

### Innovation:

✅ Added the Hamburger button in the menu
✅ Added the feature of logging in (keeping the record) while someone submits the contact form which provides improved user experience.
✅ Website uses AJAX (Asynchronous JavaScript) to submit user messages without reloading the page 
✅ Conditional code handles local vs. deployed credentials (Render vs. localhost), about this more is given below
✅ Gave the Hightlights section at the bottom of the Home Page to jump to other relevant pages quickly (enhanced utility)

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

│ ├── contact_submissions.csv (given just for storing in local database)

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

Google Sheet Link (View Only):(https://docs.google.com/spreadsheets/d/1wavyKlHG4So13TdMUJyrdeQAZacylXZgHJHassvqiww/edit?usp=sharing)

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

```
git clone https://github.com/Doofenshmirtz16/Physics-Association-Website.git
cd Physics-Association-Website
```

## 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```
OR (generate yourself):
```
pip freeze > requirements.txt
```
Example requirements.txt:
```
Flask==2.3.2
gspread==6.0.2
google-auth==2.22.0
google-auth-oauthlib==1.0.0
google-auth-httplib2==0.1.0
```
## 3️⃣ Setup Google Sheets API (for Contact Form)
Create a Google Cloud project

Enable Google Sheets API

Create a Service Account → generate credentials.json

Place credentials.json in credentials/ folder

Share your Google Sheet with the service account email (Editor access)

Set the Spreadsheet ID in app.py:
```
SPREADSHEET_ID = 'your-google-spreadsheet-id'
```


#### Note: This part of setting up a google sheet is a little bit extensive. To simply just test it out locally on computer, you can just remove the following line of codes from the current app.py in repo while ensuring that you do have contact_submissions.csv under data folder. (We will basically remove the part of setting up Google Sheets and leave the local csv file to store data.)
```
import gspread
from google.oauth2.service_account import Credentials
```
```
if os.environ.get('GOOGLE_CREDS_JSON'):
    with open('temp_google_creds.json', 'w') as f:
        f.write(os.environ['GOOGLE_CREDS_JSON'])
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'temp_google_creds.json'

# Setup Google Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SERVICE_ACCOUNT_FILE = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "credentials/credentials.json")

credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
gc = gspread.authorize(credentials)

# Open the sheet by ID
SPREADSHEET_ID = '1wavyKlHG4So13TdMUJyrdeQAZacylXZgHJHassvqiww'
spreadsheet = gc.open_by_key(SPREADSHEET_ID)
sheet = spreadsheet.sheet1
```
Finally, in the section of contact form routes, you will remove:
```
# Append row to Google Sheet
sheet.append_row([name, email, subject, message])
```


## 4️⃣ Run the Application Locally
```
python app.py
```
Open your browser at:
```
[http://127.0.0.1:5000/] (http://localhost:5000 )
```

#### Note: In the file app.py, there's a code to create a credentials file just above the part of setting up Google Sheets API. This part of code is just used for hosting on Render so that credentials are not pushed on github but rather just locally included while hosting the website.


## Credits

Developed as part of Physics Association Web Application Project

Physics Department Website

Designed and implemented by:

Sumit Sharma (Engineering Physics 2nd year)

Enrollment No.: 23123042

Technologies used: Flask, HTML, CSS, JS, Google Sheets API

