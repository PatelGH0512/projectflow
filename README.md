# Projectflow 🚀

**Projectflow** is a modern, responsive, and full-featured project management platform designed to help teams plan, track, and deliver work more efficiently. It offers an intuitive UI, Kanban boards, timelines, task labels, and team collaboration — all in a sleek dark/light themed environment.

---

## ✨ Features

- 🧩 Task boards with drag & drop
- 📅 Timeline view for project tracking
- ✅ Task priorities & labels
- 👥 User & team management
- 🔐 Auth with AWS Cognito
- 🌙 Light/Dark mode toggle
- 📁 Projects list with collapsible sidebar

---

## 🛠️ Tech Stack

| Frontend         | Backend / APIs       | Auth & State         |
|------------------|----------------------|----------------------|
| Next.js (App Router) | REST API (custom or Amplify) | AWS Cognito + Amplify |
| TypeScript       | AWS S3 (image storage) | Redux Toolkit        |
| Tailwind CSS     | Prisma |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/projectflow.git
cd projectflow


Overview of the application.
Collecting workspace informationHere’s a detailed summary of **Projectflow**, its architecture, features, components, and authentication flow, based on your workspace:

---

## Projectflow Overview

**Projectflow** is a modern project management platform designed for teams to plan, track, and deliver work efficiently. It features an intuitive UI with Kanban boards, timelines, task labels, team collaboration, and a responsive dark/light theme.

---

### Architecture

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS, Redux Toolkit for state management.
- **Backend:** Node.js with Express, REST API, Prisma ORM, PostgreSQL (assumed), AWS S3 for file storage.
- **Authentication:** AWS Cognito via AWS Amplify.
- **State Management:** Redux Toolkit Query for API data fetching and caching.

---

### Key Features

#### 1. **Task Boards (Kanban)**
- Drag & drop tasks between columns (statuses: To Do, Work In Progress, Under Review, Completed).
- Each task displays title, description, priority, assignee, attachments, and comments.
- Implemented in `BoardView`.

#### 2. **Timeline View**
- Visualizes project tasks and deadlines on a timeline.
- Switchable via tabs in `ProjectHeader`.

#### 3. **Table & List Views**
- Tabular and list representations of tasks for quick filtering and sorting.
- Accessible via the same tabbed interface.

#### 4. **Projects Management**
- Create, view, and manage multiple projects.
- Projects are listed in the collapsible sidebar (`Sidebar`).
- Project creation handled by `ModalNewProject`.

#### 5. **User & Team Management**
- Users and teams are managed via dedicated pages and API endpoints.
- Sidebar links to users and `/teams`.

#### 6. **Search**
- Full-text search across tasks, projects, and users.
- Implemented via the `/search` endpoint and UI.

#### 7. **Authentication**
- AWS Cognito handles user sign-up, sign-in, and session management.
- Integrated via AWS Amplify in `authProvider.tsx`.
- User details (profile picture, username) are fetched and displayed in the sidebar and other components.

#### 8. **Dark/Light Mode**
- Theme toggling is managed via Redux state and Tailwind CSS classes.

#### 9. **Responsive Design**
- Sidebar collapses on mobile, with a mobile footer for user info and sign out.

---

### Component Structure

- **Sidebar:** Navigation, project list, user info, sign out (`Sidebar`).
- **Header:** Page titles and action buttons (`Header`).
- **ProjectCard:** Displays project summary (`ProjectCard`).
- **ModalNewProject/ModalNewTask:** Forms for creating projects and tasks.
- **BoardView/ListView/TimelineView/TableView:** Different task visualization modes.
- **Redux State:** API slices for projects, tasks, users, teams (`api.ts`).

---

### Authentication Flow

1. **Sign Up/Sign In:**  
   Users authenticate via AWS Cognito, using Amplify’s UI components.
2. **Session Management:**  
   Amplify manages tokens and session state. Tokens are attached to API requests for authorization.
3. **User Data Fetching:**  
   After login, user details are fetched from the backend and displayed in the UI.
4. **Sign Out:**  
   Calls Amplify’s `signOut` method, clearing session and redirecting to login.

---

### How It Works

- **Frontend** sends API requests (with Cognito JWT tokens) to the backend for all CRUD operations.
- **Backend** validates tokens, interacts with the database via Prisma, and returns data.
- **State** is managed globally with Redux Toolkit, and UI updates reactively as data changes.
- **Files** (profile pictures, attachments) are stored on AWS S3 and referenced via URLs.

---

**In summary:**  
Projectflow is a full-stack, cloud-enabled project management tool with modern UX, real-time collaboration, and robust authentication, built for teams to manage projects efficiently.

---

**Relevant files for reference:**
- index.tsx
- index.tsx
- ProjectHeader.tsx
- authProvider.tsx
- api.ts
- projectController.ts
- README.md

Screenshots 
1.
![Screenshot 2025-07-02 at 3 48 32 PM](https://github.com/user-attachments/assets/73289b2e-af44-4361-8db6-76fa5f15923a)
2.
![Screenshot 2025-07-02 at 3 48 42 PM](https://github.com/user-attachments/assets/a81d2234-0a8b-4d86-8ac0-3e8e681658bb)
3.![Screenshot 2025-07-02 at 3 49 31 PM](https://github.com/user-attachments/assets/8da4d254-9dbf-4e9a-bca6-6fae654bb31b)

4.![Screenshot 2025-07-02 at 3 49 42 PM](https://github.com/user-attachments/assets/5c420db7-e516-4937-9065-529964395af6)

5.![Screenshot 2025-07-02 at 3 49 53 PM](https://github.com/user-attachments/assets/a61dce8f-6066-4e46-bb61-e6d26a5764f2)

6.![Screenshot 2025-07-02 at 3 50 02 PM](https://github.com/user-attachments/assets/5d3a0f32-b726-4782-8473-8aae2d99e3d6)

7.![Screenshot 2025-07-02 at 3 50 25 PM](https://github.com/user-attachments/assets/eeee14b6-70c4-41dd-ba07-51d710868b1f)

8.![Screenshot 2025-07-02 at 3 50 40 PM](https://github.com/user-attachments/assets/8682f48a-bcb2-4a94-9498-8a6feec7ebe1)

9.![Screenshot 2025-07-02 at 3 50 50 PM](https://github.com/user-attachments/assets/3561ff8d-1043-4791-b462-63c96e7fab31)

10.![Screenshot 2025-07-02 at 3 52 17 PM](https://github.com/user-attachments/assets/91a5acc4-2954-4bb8-a5a9-8095384c3c10)
11.![Screenshot 2025-07-02 at 3 52 29 PM](https://github.com/user-attachments/assets/e1bfc3a3-84ea-468b-9700-845d75f902f0)

12.














