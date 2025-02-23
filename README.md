# e-ticket_booking_app
# Setting Up the Project from Scratch

Follow these steps to set up the project from scratch and initialize it with GitHub.

---

## 1. Create an Empty GitHub Repository

1. Go to [GitHub](https://github.com/) and log in.
2. Click on **New Repository**.
3. Enter a **repository name** (e.g., `e-ticket_booking_app`).
4. Do **not** add a README, `.gitignore`, or license (we'll add them later).
5. Click **Create Repository**.

---


## 2. Clone the Repository Locally

```bash
git clone https://github.com/<your-username>/e-ticket_booking_app.git
cd e-ticket_booking_app
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors nodemon
cd ..
npx create-react-app frontend
cd frontend
npm install
cd ..
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/<your-username>/e-ticket_booking_app.git
git push -u origin main
cd backend
npm run dev
cd ../frontend
npm start

```


