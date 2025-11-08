const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing tasks.json');
    process.exit(1);
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

function getNextId(tasks) {
  return tasks.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;
}

module.exports = {
  loadTasks,
  saveTasks,
  getNextId
};
