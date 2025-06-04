# User Profile Aggregator - Backend

 User Profile Aggregator app

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- [GitHub API](https://api.github.com/users)

---

## Features

- Simple login system with JWT token generation
- Fetch user info from two external APIs
- Aggregate user data into one response
- Protect routes using middleware (`authenticateToken`)
- CORS + JSON parsing support

 Install dependencies
 npm install
 npm install nodemon
 
 ## In FrontEnd package.json
 "scripts": {
   "start": "node index.js",
  "dev": "nodemon index.js"
  },
## for backend
PORT=3000
JWT_SECRET=gowtham

## for frontend
REACT_APP_API_URL=http://192.168.101.71:3001/api
# Install dependencies
npm install
npm start

```bash
 git clone https://github.com/gowthamRaj-sudo/Aggregating_profile.git
cd Aggregating_profile
