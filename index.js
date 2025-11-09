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

    case 'update': {
        const id = parseInt(argv[1], 10);
        const newDesc = argv[2];

        if (!id || !newDesc) {
            console.error('Usage: task-tracker update <id> "New description"');
            process.exit(1);
        }

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.error(`Task with ID ${id} not found.`);
            process.exit(1);
        }

        task.description = newDesc;
        task.updateAt = new Date().toISOString();

        saveTasks(tasks);
        console.log(`Task ${id} updated.`);

        break;
    }

    case 'delete': {
        const id = parseInt(argv[1], 10);
        
        if (!id) {
            console.error('Usage: task-tracker delete <id>');
            process.exit(1);
        }

        const index = tasks.findIndex(t => t.id === id);

        if (index < 0) {
            console.error(`Task with ID ${id} not found.`);
            process.exit(1);
        }

        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log(`Task ${id} deleted.`);
        break;
    }

    case 'mark-in-progress': {
        const id = parseInt(argv[1], 10);

        if (!id) {
            console.error('Usage: task-tracker mark-in-progress <id>');
            process.exit(1);
        }

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.error(`Task with ID ${id} not found.`);
            process.exit(1);
        }

        task.status = 'in-progress';
        task.updateAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task ${id} marked in-progress.`);
        break;
    }

    case 'mark-done': {
        const id = parseInt(argv[1], 10);

        if (!id) {
            console.error('Usage: task-tracker mark-done <id>');
            process.exit(1);
        }

        const task = tasks.find(t => t.id == id);

        if (!task) {
            console.error(`Task with ID ${id} not found.`);
            process.exit(1);
        }

        task.status = 'done';
        task.updateAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task ${id} marked done.`);
        
        break;
    }

    default:
        console.log('Usage: task-tracker <command> [option]');
        console.log('Commands: add | list [status] | update <id> "desc" | delete <id> | mark-in-progress <id> | mark-done <id>');
        break;
}