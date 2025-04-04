# 🌐 My Personal Website

Welcome to my personal website — a fullstack project built with React and Node.js.  
It showcases my profile, work experience, skills, and certifications and contact information.

---

## 🛠 Tech Stack

- **Frontend:** React (in `/client`)
- **Backend:** Node.js + Express (in `/server`)
- **Styling:** SCSS, CSS modules
- **Build Tools:** Create React App, gh-pages
- **Deployment:**
  - **Frontend:** GitHub Pages
  - **Backend:** Personal Server

---

## 🚀 Deployment

### 🌐 Frontend (GitHub Pages)

1. Go into the `client/` folder:
   ```bash
   cd client
   ```

2. Set the `homepage` in `client/package.json`:
   ```json
   "homepage": "https://zanderp.github.io"
   ```

3. Deploy:
   ```bash
   npm install
   npm run deploy
   ```

> This will build and publish the frontend to the `gh-pages` branch.

---

### 🖥 Backend (CasaOS Module)

The backend is deployed as a CasaOS custom app using `docker-compose`.

#### 🔧 `docker-compose.yml`

```yaml
version: '3.8'

services:
  backend:
    container_name: zander-backend
    image: node:22.14.0-alpine3.21
    ports:
      - "3001:3001"
      - "5000:5000"
    restart: unless-stopped
    volumes:
      - backend_data:/usr/src/app
    working_dir: /usr/src/app
    entrypoint: sh
    command: -c "cd /usr/src/app && sh start.sh"

volumes:
  backend_data:
```

#### 🔐 `start.sh` (inside container or mounted)

```sh
#!/bin/sh
cd /usr/src/app
apk update && apk add --no-cache git

if [ -d "zanderp.github.io" ]; then
    cd zanderp.github.io && git pull origin master
else
    git clone https://github.com/zanderp/zanderp.github.io.git
    cd zanderp.github.io
fi

cd server
npm install
npm run start
```

> This script ensures the backend is always up-to-date with the latest `master` branch.

---

## 🔐 Security Notes

- API keys (e.g., Google Maps) are hidden behind backend routes to prevent client exposure.
- Env vars are loaded via `.env` and not exposed publicly.

---

## 🧪 Local Development

From project root:

```bash
# Start both frontend and backend
npm install
npm run dev
```

You can also run them independently:

```bash
# Frontend
cd client && npm start

# Backend
cd server && npm run dev
```

---

## 📬 Contact

If you found a bug or want to collaborate, feel free to reach out via the contact form on the website or at [hello@alexandru.rocks](mailto:hello@alexandru.rocks).

---

## 📝 License

MIT