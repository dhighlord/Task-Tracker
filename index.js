#!/usr/bin/env node

const { loadTasks, saveTasks, getNextId } = require('./task');

const tasks = loadTasks();

const argv = process.argv.slice(2);
const cmd = argv[0];

switch (cmd) {
    case 'add': {
        const description = argv[1];
        if (!description) { 
            console.error('Usage: task-tracker add "Description of task"');
            process.exit(1);
        }

        const newTask = {
            id: getNextId(tasks),
            description,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString()
        };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log(`Task added successfully (ID: ${newTask.id})`);
        break;
    }

    case 'list': {
        const filterStatus = argv[1];
        let toShow = tasks;

        if (filterStatus) {
            if (!['todo', 'in-progress', 'done'].includes(filterStatus)) {
                console.error('Invalid status. Use: todo. in-progress, done');
                process.exit(1);
            }
            toShow = tasks.filter(t => t.status === filterStatus);
        }

        if (toShow.length === 0) {
            console.log('No tasks found.');
        } else {
            toShow.forEach(t =>
                console.log(`${t.id}: [${t.status}] ${t.description} (Created: ${t.createdAt})`)
            );
        }
        break;
    }
}