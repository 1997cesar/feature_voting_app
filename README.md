# Feature Voting App

This is a simple full-stack app built for a coding challenge. It allows users to post features and upvote existing ones.

## 🔧 Tech Stack

- **Backend**: FastAPI (Python), SQLite, SQLAlchemy
- **Frontend**: React Native with Expo
- **Database**: SQLite

## 🧪 How to Run Locally

### Backend

1. Navigate to `backend/`:
   ```bash
   cd backend

    Create virtual environment and activate it:

python -m venv venv
source venv/bin/activate  # On Windows use venv\\Scripts\\activate

Install dependencies:

pip install fastapi uvicorn sqlalchemy

Run the backend:

    uvicorn main:app --reload

Frontend

    Navigate to frontend/:

cd frontend

Install Expo CLI (if you don't have it):

npm install -g expo-cli

Start the project:

    expo start

    Use Expo Go on your phone to scan the QR code.

    Note: If you're running on a real device, make sure to replace localhost with your machine's local IP in App.js.

📂 Prompts Used

See prompts.txt for a log of all AI prompts used in building this project.
