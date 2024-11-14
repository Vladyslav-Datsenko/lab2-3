const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
let todos = [];

// Ініціалізація додатку: завантажуємо справи з localStorage при старті
function init() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    render();
    Counter();
}

// Функція для збереження списку справ у localStorage
function saveTodoList() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
    const text = prompt('Enter the new task:');
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTask);
        saveTodoList();  // Зберігаємо список справ після додавання нової справи
        render();
        Counter();
    }
}

function renderTodo(todo) {
    const { id, text, completed } = todo;
    return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="todo-${id}" ${completed ? 'checked' : ''} onclick="checkTodo(${id})">
            <label for="todo-${id}">
                <span class="${completed ? 'text-success text-decoration-line-through' : ''}">${text}</span>
            </label>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${id})">delete</button>
        </li>
    `;
}

function render() {
    list.innerHTML = '';
    todos.forEach(todo => {
        list.insertAdjacentHTML('beforeend', renderTodo(todo));
    });
}

function Counter() {
    const total = todos.length;
    const uncheckedCount = todos.filter(todo => !todo.completed).length;
    
    itemCountSpan.textContent = total;
    uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodoList();  // Зберігаємо зміни після видалення справи
    render();
    Counter();
}

function checkTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodoList();  // Зберігаємо зміни після оновлення статусу виконання
    render();
    Counter();
}

// Викликаємо init при завантаженні сторінки
init();