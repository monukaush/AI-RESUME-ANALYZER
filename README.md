# AI Resume Analyzer

Cleaned project structure with a separate Django backend and React/Vite frontend.

## Structure

```text
AI RESUME/
├── backend/
│   ├── analyzer/
│   ├── config/
│   ├── templates/
│   ├── media/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py check
python manage.py runserver
```

Set your real Gemini/database/social-login values in `backend/.env`.

## Frontend

In another terminal:

```powershell
cd frontend
npm install
npm run dev
```

The current frontend API configuration is in `frontend/src/api.js`.

## Important

The cleaned archive intentionally does **not** include `.env` secrets, `.git`, `.venv`, `node_modules`, build output, Python cache files, or uploaded resume PDFs. These should not be committed or shared.
