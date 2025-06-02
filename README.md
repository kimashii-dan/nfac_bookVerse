# 📚 BookVerse
**BookVerse** is a fullstack web application that allows users to search for books, view detailed information, save favorites, and interact with an AI to receive personalized reading recommendations.

---

## 🚀 Installation

### Clone the repository
- git clone https://github.com/kimashii-dan/nfac_bookVerse.git

### Start the frontend:
- cd frontend
- npm i
- npm run dev

### Start the backend:
- cd backend
- python -m venv venv
- venv\Scripts\activate   # On Windows
- cd api
- pip install -r requirements.txt
- uvicorn main:app --reload

---

## ⚙️Workflow
Since external APIs are only accessible from the server side, the request flow is structured as follows:
1. The frontend sends a request to the backend.
2. The backend calls the external API.
3. The external API responds to the backend.
4. The backend returns the response to the frontend.

---

## 🛠️Development process
- I began by selecting technologies that would best meet the project requirements. For theming, I used Shadcn UI because it provides excellent support for Tailwind CSS and includes theming guidance in its documentation.
- Ensuring type safety across the entire application was a top priority. I carefully defined types on both the frontend (React) and backend (FastAPI models) to keep everything consistent and reliable.
- A significant amount of time was spent handling URL parameters like query, searchBy, and page to create a smooth and intuitive search experience.
- This was my first time deploying a fullstack application. I used Vercel to host the frontend and Railway for the backend, which helped me learn about modern PaaS (Platform as a Service) deployments.

---

## Methodologies and features
1. **Debounced Search Input***
To improve responsiveness and reduce server load, I implemented debouncing. When the user types in the search input, a timer delays the update. If the user continues typing, the timer resets — ensuring requests are only sent after typing stops.
2. **Global Theming with Context API**
I implemented theming using useContext(ReactAPI) to manage light and dark modes globally. The current theme is stored in context and can be toggled from anywhere in the app. Components from Shadcn respond to the theme automatically using predefined color variables in index.css.
   
---

## Challenges and lessons learned
1. **Managing URL Search Parameters**.
I wanted specific behavior from the search query:
- query, searchBy, and page should only appear in the URL when query is not empty.
- When a query is entered, page should reset to 1, and searchBy should sync with local state.
- Changing either query or searchBy resets the page parameter.
2. **Backend Naming Conventions (CamelCase vs. Snake_case)**.
Coming from a JavaScript background, I initially used camelCase in my backend models (e.g., averageRating) instead of snake_case (average_rating). This led to a type mismatch error when saving user data — and taught me the importance of adhering to Pythonic conventions in FastAPI.

---

## Stack
- **Frontend** : React (Javascript)
- **Backend** : FastAPI (Python)
### Why I chose this stack?
- I enjoy React’s component-based architecture — it allows me to build UIs from reusable parts, making development faster and more structured.
- I wanted to experiment with FastAPI, and this project gave me a great opportunity to explore it for the first time.

## Deployment
- **Frontend: Vercel**
- **Backend: Render**
