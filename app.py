from flask import Flask, render_template, jsonify, request
import os
import json
import csv
import logging
logging.basicConfig(level=logging.INFO)

import gspread
from google.oauth2.service_account import Credentials

app = Flask(__name__, static_folder='static', template_folder='templates')

# Setup Google Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SERVICE_ACCOUNT_FILE = 'credentials/credentials.json'

credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

gc = gspread.authorize(credentials)

# Open the sheet by ID
SPREADSHEET_ID = '1wavyKlHG4So13TdMUJyrdeQAZacylXZgHJHassvqiww'
spreadsheet = gc.open_by_key(SPREADSHEET_ID)
sheet = spreadsheet.sheet1


# Route for home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for other pages
@app.route('/<page>')
def load_page(page):
    return render_template(page)

# Route for serving JSON data (labs, faculty, etc.)
@app.route('/data/<filename>')
def get_data(filename):
    try:
        with open(os.path.join('data', filename), 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

# Contact form routes
@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/submit-message', methods=['POST'])
def submit_message():
    try:
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        subject = request.form.get("subject", "").strip()
        message = request.form.get("message", "").strip()

        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'error': 'All fields are required'}), 400

        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'error': 'Invalid email format'}), 400

        # Append row to Google Sheet
        sheet.append_row([name, email, subject, message])

        app.logger.info(f"Contact form submitted: Name={name}, Email={email}, Subject={subject}")

        # Ensure data directory exists
        os.makedirs('data', exist_ok=True)

        # Append row to local CSV
        with open('data/contact_submissions.csv', 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([name, email, subject, message])
        
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
