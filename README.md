# 📚 BookVerse
an app that allows users to search for books, view detailed information about them, save favorites, and communicate with AI to receive reading recommendations.

---

## Installation
### Clone the repo
- git clone https://github.com/kimashii-dan/nfac_bookVerse.git

### Frontend run:
- cd frontend
- npm i
- npm run dev

### Backend run:
- cd backend
- python -m venv venv
- venv\Scripts\activate
- cd api
- pip install requirements.txt
- uvicorn main:app --reload

---

## Workflow
Because external APIs are only allowed to be called from the server side, the structure looks like this: 
- Frontend sends request to the backend,
- Backend sends request to the external API,
- External API sends response back to the backend,
- And finally frontend receives response

## Development process
- At first I identified which frameworks/tools will I use for this task to cover as many requirements as possible. For example for theming I chose Shadcn UI library because it provides dedicated page in docs on theming implementation with Tailwind CSS.
- It is very important for me to have a typesafety across entire application so I ensured that every type I've declared is accurate and perfectly in sync with other types. And that includes not only types in frontend but models in backend.
- I spent a lot of time on URL parameters like "query", "searchBy", "page" to finally build the behaviour I wanted to achieve.
- I've never deployed fullstack apps, so it is new experience for me. I used PaaS (Platform as a Service) like Vercel for the frontend and Railway for the backend.


---

## Methodologies
1. I used 'debounce' technique to make UI to be more responsive and to reduce overall load on DB. When the user types, a timer sets the value after a delay. If they keep typing, the timer resets. Since the debounced value is in the useEffect dependency array, the effect only triggers after typing stops.
2. I implemented theming using useContext(ReactAPI) to manage light and dark modes globally. The current theme is stored in context and can be toggled from anywhere in the app. Components from Shadcn respond to the theme automatically using predefined color variables in index.css.

   
---

## Issues I've faced during development
1. I've struggled with URL search parameters because I wanted them to behaviour in a specific way:
- Search params can only be set in URL if search "query" is not empty.
- As soon as search "query" is not empty, automatically set "page" parameter to 1 and "searchBy" parameter to local state
- "Page" parameter needs to be reset if search "query" or "searchBy" changes
2. Because I mostly have been working with Javascript I was unintentionally declaring model's fields like this - averageRating, instead of this - average_rating. I actually didn't know that naming like camelCase or snake_case does matter. And in fact, I got "type mismatch error" when tried add book to the user. So I learned from it.

## Stack
- Frontend - React (Javascript)
- Backend - FastAPI (Python)
### Why I chose this stack?
- I really like React's component-based structure, which helps me break down the UI into reusable pieces and build faster.
- I've never tried with FastAPI and that's why I wanted to give it a try.
