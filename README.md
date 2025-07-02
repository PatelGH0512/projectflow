# Projectflow 🚀

**Projectflow** is a modern, responsive, and full-featured project management platform designed to help teams plan, track, and deliver work more efficiently. It offers an intuitive UI, Kanban boards, timelines, task labels, and team collaboration — all in a sleek dark/light themed environment.
---

## 📘 Projectflow Overview

**Projectflow** is a modern project management platform designed for teams to plan, track, and deliver work efficiently. It features an intuitive UI with Kanban boards, timelines, task labels, team collaboration, and a responsive dark/light theme.

---

## 🏗️ Architecture

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS, Redux Toolkit for state management.
- **Backend:** Node.js with Express, REST API, Prisma ORM, PostgreSQL (assumed), AWS S3 for file storage.
- **Authentication:** AWS Cognito via AWS Amplify.
- **State Management:** Redux Toolkit Query for API data fetching and caching.

---

## 🔑 Key Features

### 1. 🧩 Task Boards (Kanban)
- Drag & drop tasks between columns (To Do, Work In Progress, Under Review, Completed).
- Tasks include title, description, priority, assignee, attachments, and comments.
- Implemented in `BoardView`.

### 2. 🗓️ Timeline View
- Visualizes project tasks and deadlines.
- Toggleable via tabs in `ProjectHeader`.

### 3. 📋 Table & List Views
- Tabular and list formats for easy filtering and sorting.
- Accessible through a unified tabbed interface.

### 4. 📁 Projects Management
- Create, view, and manage multiple projects.
- Projects are listed in a collapsible sidebar (`Sidebar`).
- Project creation is handled by `ModalNewProject`.

### 5. 👥 User & Team Management
- Users and teams are managed through dedicated pages.
- Sidebar includes links to `/users` and `/teams`.

### 6. 🔍 Search
- Full-text search across tasks, projects, and users.
- Implemented via the `/search` endpoint and UI components.

### 7. 🔐 Authentication
- AWS Cognito handles user sign-up, sign-in, and sessions.
- Integrated using AWS Amplify in `authProvider.tsx`.
- Displays user details (profile picture, username) across UI.

### 8. 🌗 Dark/Light Mode
- Theme toggling handled via Redux state and Tailwind CSS.

### 9. 📱 Responsive Design
- Sidebar collapses on mobile.
- Mobile footer includes user info and sign-out functionality.

---

## 🧱 Component Structure

| Component        | Purpose                                     |
|------------------|---------------------------------------------|
| `Sidebar`        | Navigation, projects list, user info        |
| `Header`         | Page title and action buttons               |
| `ProjectCard`    | Project summary display                     |
| `ModalNewProject`/`ModalNewTask` | Project/task creation forms |
| `BoardView`/`ListView`/`TimelineView`/`TableView` | Task displays |
| `api.ts`         | API slices for tasks, users, teams, projects |

---

## 🔐 Authentication Flow

1. **Sign Up / Sign In**  
   Users log in using AWS Cognito, integrated via Amplify.

2. **Session Management**  
   Amplify manages tokens and sessions; tokens are attached to API requests.

3. **User Data Fetching**  
   After login, user profile details are fetched and shown in the UI.

4. **Sign Out**  
   Authenticated users can sign out using Amplify’s `signOut()` method.

---

## ⚙️ How It Works

- **Frontend:** Sends API requests (with Cognito JWTs) to the backend for CRUD operations.
- **Backend:** Validates tokens, performs DB operations via Prisma, returns JSON.
- **State:** Managed globally using Redux Toolkit and RTK Query.
- **File Storage:** Profile pictures and attachments are uploaded to AWS S3 and served via URLs.

---


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














