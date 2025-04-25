# 📚 BookVerse - 
an app that allows users to search for books, view detailed information about them, save favorites, and communicate with AI to receive reading recommendations.

---

## 🛠️ Installatioin

# Clone the repo
- git clone https://github.com/kimashii-dan/nfac_bookVerse.git

# Frontend run:
- cd frontend
- npm i
- npm run dev

# Backend run:
- cd backend
- python -m venv venv
- venv\Scripts\activate
- cd api
- pip install requirements.txt
- uvicorn main:app --reload

---

## Structure
Because external APIs are only allowed to be invoked from the server side the structure looks like this: 
- Frontend sends request to backend,
- Backend sends requests to external API,
- External API sends response back to backend,
- And finally frontend receives data


---

## Methodologies
1. I used 'debounce' technique to make UI to be more responsive and to reduce overall load on DB. When the user types, a timer sets the value after a delay. If they keep typing, the timer resets. Since the debounced value is in the useEffect dependency array, the effect only triggers after typing stops.
2. I implemented theming using useContext(ReactAPI) to manage light and dark modes globally. The current theme is stored in context and can be toggled from anywhere in the app. Components from Shadcn respond to the theme automatically using predefined color variables in index.css.
3. 
---

## Issues I've faced during development

## Stack
Frontend: React 
Backend: FastAPI
--
Why I chose this stack?
- I really like React's component-based structure, which helps me break down the UI into reusable pieces and build faster.
- I've never tried with FastAPI and that's why I wanted to give it a try.
