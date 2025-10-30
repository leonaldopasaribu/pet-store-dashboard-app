# 🐾 Pet Store Dashboard App

A modern, responsive CRUD dashboard application for managing pet store inventory. Built with **React**, **Vite**, **TypeScript**, and **Chakra UI**, powered by the PetStore API.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Library:** Chakra UI
- **Package Manager:** pnpm
- **API:** [PetStore API v3](https://petstore3.swagger.io/)

## 📸 Screenshots

### Dashboard Overview
<img width="1465" alt="Dashboard showing pet store statistics and overview" src="https://github.com/user-attachments/assets/7428af40-90b1-404b-be49-c6ad43b3f7e0" />

### Pet List Management
<img width="1470" alt="Pet list page with search and filter capabilities" src="https://github.com/user-attachments/assets/1a155fda-bb81-4281-9c30-cd4bdde6b65d" />

### Create/Update Pet Dialog
<img width="577" alt="Modal dialog for creating and updating pet information" src="https://github.com/user-attachments/assets/32506ff2-506b-48b3-b72b-b45a8eb651ee" />

### Delete Confirmation
<img width="423" height="237" alt="Screenshot 2025-10-30 at 10 46 21" src="https://github.com/user-attachments/assets/adf97305-856e-4fcc-b574-38b99208c117" />


## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)

If you don't have pnpm installed, you can install it globally:
```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pet-store-dashboard.git
cd pet-store-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all project dependencies |
| `pnpm run dev` | Start development server with hot reload |
| `pnpm run build` | Build the app for production |
| `pnpm run preview` | Preview production build locally |
| `pnpm run test` | Run test suite |
| `pnpm run lint` | Lint and check code quality |

## 🔌 API Reference

This application uses the **PetStore API v3** for all backend operations.

**Base URL:** `https://petstore3.swagger.io/api/v3`

### Main Endpoints Used

- `GET /pet/findByStatus` - Fetch pets by status
- `GET /pet/{petId}` - Get pet details by ID
- `POST /pet` - Create a new pet
- `PUT /pet` - Update an existing pet
- `DELETE /pet/{petId}` - Delete a pet

For complete API documentation, visit: [https://petstore3.swagger.io/](https://petstore3.swagger.io/)

## 👨‍💻 Author

**Your Name**
- GitHub: [@leonaldopasaribu](https://github.com/leonaldopasaribu)
- LinkedIn: [Leonaldo Pasaribu](https://linkedin.com/in/leonaldo-pasaribu)

## 🙏 Acknowledgments

- [PetStore API](https://petstore3.swagger.io/) for providing the backend API
- [Chakra UI](https://chakra-ui.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the blazing fast build tool

---

⭐ **Star this repo if you find it helpful!**
