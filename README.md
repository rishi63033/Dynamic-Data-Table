# Dynamic Data Table Manager (Next.js + Redux + MUI)

📊 **Frontend Interview Task**

This is a **Dynamic Data Table Manager** built with Next.js, Redux Toolkit, and Material UI (MUI).  
The project demonstrates dynamic UI handling, complex state management, and real-world features like CSV import/export, inline editing, searching, sorting, and dynamic columns.
---

## 🚀 Features

### Core Features
- **Table View**
  - Display a table with default columns: `Name`, `Email`, `Age`, `Role`
  - Column sorting (ASC/DESC toggle)
  - Global search (searches all fields)
  - Client-side pagination (10 rows per page)

- **Dynamic Columns**
  - "Manage Columns" modal to:
    - Add new fields like `Department` or `Location`
    - Show/hide columns dynamically
  - Column visibility persisted via `Redux Persist`  

- **Import & Export**
  - Import CSV files (with validation)
  - Export current table view to `.csv` (only visible columns)

### Bonus Features
- Inline row editing with validation (`age` must be a number)
- Row actions: Edit
---

## 🛠️ Tech Stack

- **Frontend:** React 18, Next.js 14 (App Router)
- **State Management:** Redux Toolkit
- **UI:** Material UI v5
- **Forms & Validation:** React Hook Form
- **CSV Handling:** PapaParse
- **CSV Export:** FileSaver.js / Blob
- **Persistence:** Redux Persist / localStorage
- **Language:** TypeScript

---

## Getting Started

Follow these steps to get the project running locally:

### 1. Clone the repository and run the project

```bash
git clone https://github.com/rishi63033/Dynamic-Data-Table.git
cd Dynamic-Data-Table
npm install
npm run dev


