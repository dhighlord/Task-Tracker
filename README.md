# Task Tracker CLI 

A simple Task Tracker Command Line Interface built with Node.js — inspired by the roadmap.sh Task Tracker project.
It lets you add, update, delete, and list tasks directly from your terminal — no external libraries required.

### Features

- ➕ Add new tasks
- ✏️ Update or delete existing tasks
- ✅ Mark tasks as "in-progress" or "done"
- 📋 List all tasks or filter by status (todo, in-progress, done)
- 💾 Data is stored in a local JSON file (tasks.json)
- ⚡ Built entirely using vanilla Node.js (no dependencies)

### Tech Stack

- **Language:** JavaScript (Node.js)
- **Modules used:** fs, path, process  
- **Data storage:** JSON file (tasks.json)

### PROJECT STRUCTURE
```
task-tracker/
├── index.js -> main CLI entry point
├── task.js -> handles file read/write and helper functions
├── tasks.json -> stores all tasks (auto-created)
└── README.md
```

### INSTALLATION
1. Clone the repository.
2. Make it executable (optional, for macOS/Linux):
```bash
chmod +x index.js
```

3. (Optional) Link globally:
```bash
npm link
```

Then you can run:
```bash
task-tracker add "Buy groceries"
```

Or just use:
```bash
node index.js add "Buy groceries"
```

### USAGE

**Add a new task:**
```bash
task-tracker add "Finish writing documentation"
```

**List all tasks:**
```bash
task-tracker list
```
**List tasks by status:**
```bash
task-tracker list todo
task-tracker list in-progress
task-tracker list done
```

**Update a task description:**
```bash
task-tracker update 1 "Finish full README and examples"
```

**Delete a task:**
```bash
task-tracker delete 1
```

**Change task status:**
```bash
task-tracker mark-in-progress 2
task-tracker mark-done 2
```

### DATA FORMAT (tasks.json)
```json
[
    {
        "id": 1,
        "description": "Buy groceries",
        "status": "todo",
        "createdAt": "2025-11-08T22:00:00.000Z",
        "updatedAt": "2025-11-08T22:00:00.000Z"
    }
]
```

### LEARNING GOALS

**This project helped me practice:**
- Command-line app structure
- File I/O in Node.js
- Argument parsing using process.argv
- CRUD operations
- JSON-based data persistence

### LICENSE

MIT License © 2025 Sardar Moktadir Ibna Mohsin

### INSPIRATION

Built as part of the roadmap.sh Developer Projects challenge:
https://roadmap.sh/projects/task-tracker