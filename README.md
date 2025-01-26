# Smart Asset Tracker

The **Smart Asset Tracker** is a full-stack web application designed to manage and visualize assets on an interactive map. It utilizes modern web development technologies and provides seamless asset tracking with a user-friendly interface.

---

## Features

- **Asset Management**: Create, retrieve, update, and delete assets.
- **Interactive Map**: Visualize asset locations on a dynamic map powered by the ArcGIS JavaScript API.
- **Demo Login**: Easily log in as a demo user to explore the app’s features.
- **Testing**:
  - Unit tests and integration tests implemented using **Jest** for both frontend and backend.
  - Ensure reliability and robustness by validating critical functionality with automated tests.
- **Continuous Integration/Continuous Deployment (CI/CD)**:
  - **GitHub Actions** automates testing and deployment workflows.
  - Automatic deployments on:
    - **Netlify** (frontend)
    - **Render** (backend).
- **Tech Stack**:
  - **Frontend**: React, Vite, Tailwind CSS, TypeScript.
  - **Backend**: Node.js, Express, Prisma ORM.
  - **Database**: PostgreSQL.
  - **Mapping**: ArcGIS JavaScript API.
  - **Deployment**: Netlify (frontend), Render (backend).

---

## Live Demo

You can explore the live version of the app here: [Smart Asset Tracker](https://smrt-kappa.vercel.app/)

---

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **PostgreSQL** (or a cloud database like Supabase or Neon)
- **Git**
- **ArcGIS JavaScript API** (via CDN or an API key for advanced features)
