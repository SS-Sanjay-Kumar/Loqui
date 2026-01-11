# Loqui 💬
A real-time full-stack chat application built with the MERN stack and Socket.IO.

Loqui supports real-time messaging, online user tracking, image sharing, and persistent message storage using MongoDB.

---

## Features

###  Authentication & Authorization
- User signup and login with JWT-based authentication.
- Secure cookies (`httpOnly`, `sameSite`) for session management.
- Protected API routes to ensure data privacy.

### Real-Time Messaging
- **One-to-one private chats** with instant delivery via Socket.IO.
- Real-time **online/offline status** tracking.
- Smooth typing experience and instant UI updates.

### Media Support
- Image message support powered by **Cloudinary**.
- Image preview functionality before sending to ensure accuracy.

### Persistent Storage
- MongoDB as the source of truth for all chat history.
- Messages are fetched dynamically upon conversation selection.

### State Management
- Global state managed via **Zustand** for high performance.
- Centralized handling of Socket connection lifecycles.

### UI / UX
- Responsive design using **Tailwind CSS + DaisyUI**.
- Skeleton loaders for a polished loading experience.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Zustand, Tailwind CSS, DaisyUI, Axios |
| **Backend** | Node.js, Express.js, Socket.IO |
| **Database** | MongoDB + Mongoose |
| **Cloud** | Cloudinary (Image Storage) |

---


```text
client/
├── src/
│   ├── components/    # Reusable UI elements
│   ├── store/         # Zustand stores (auth, chat)
│   ├── pages/         # Page-level components
│   ├── lib/           # Axios & Socket configurations
│   └── main.jsx       # Entry point
server/
├── src/
│   ├── controllers/   # Logic for routes
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── config/        # DB & Cloudinary config
│   └── server.js      # Server entry & Socket logic

```

---

## Data Flow

1. **Auth:** User logs in → JWT stored in secure cookie.
2. **Connection:** Socket connection established using the unique User ID.
3. **Discovery:** Sidebar fetches user list via REST API.
4. **Interaction:**
* Message sent → Saved to **MongoDB** → Emitted via **Socket.IO**.
* Recipient receives event → Zustand state updates → UI renders message.


5. **Persistence:** On refresh, Auth state is restored; messages are not refetched(as of now, will build it in the future) when a chat is opened.

---

## ❗ Important Design Notes

* **Source of Truth:** MongoDB handles all long-term storage. Socket.IO is strictly for the "real-time" layer.
* **State:** UI state (like the currently selected chat) resets on refresh to keep the client-side logic lean and predictable.

---

## Known Limitations

* No unread message counters.
* No pagination (large histories may slow down initial load).
* One-to-one messaging only (no group chats yet).

---

## Future Enhancements

* [ ] **Read Receipts:** Add checkmarks (✓✓) for message status.
* [ ] **Pagination:** Implement infinite scroll for older messages.
* [ ] **Typing Indicators:** Real-time "User is typing..." feedback.
* [ ] **Search:** Filter through conversations or message history.
* [ ] **Group Chats:** Expand the architecture to support multiple participants.
* [ ] **Invalidate JWT and authorization:** Implement proper logout instead of clearing cookies.

---

## Learning Outcomes

* Implementing **WebSockets** for real-time bi-directional communication.
* Managing complex global state with **Zustand**.
* Handling **Cloudinary** integrations for media-heavy applications.
* Structuring a scalable MERN codebase for production-like environments.

---

## License

This project is for learning and educational purposes.

```
