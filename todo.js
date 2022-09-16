// Model
      // If localstorage has a todos array, then use it
      // Otherwise use the default array.
      let todos;

      // Retrieve localStorage
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      // Check if it is an array
      if (Array.isArray(savedTodos)) {
        todos = savedTodos;
      } else {
          todos = [{
          title: 'Get groceries',
          dueDate: '08-25-2022',
          id: 'id1'
        }, {
          title: 'Wash car',
          dueDate: '09-15-2022',
          id: 'id2'
        }, {
          title: 'Make dinner',
          dueDate: '07-29-2022',
          id: 'id3'
        }];
      }

      // Creates a todo
      const createTodo = (title, dueDate) => {
        const id = '' + new Date().getTime();

        todos.push({
          title: title,
          dueDate: dueDate,
          id: id
        });

        saveTodo();
      }

      // Deletes a todo
      const removeTodo = idToDelete => {
        todos = todos.filter(todo => {
          // If the id of this todo matches idToDelete, return false
          // For everything else, return true
          if (todo.id === idToDelete) {
            return false;
          } else {
            return true;
          }
        });

        saveTodo();
      }

      function setEditing(todoId) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.isEditing = true;
          }
        });

        saveTodo();
      }

      function updateTodo(todoId, newTitle, newDate) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
          }
        });

        saveTodo();
      }

      // Saves a todo
      const saveTodo = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }

      const toggleTodo = (todoId, checked) => {
        todos.forEach(todo => {
            if (todo.id === todoId) {
                todo.isDone = checked;
            }
        });
      }


// Controller
      const addTodo = () => {
        const textbox = document.getElementById('todo-title');
        const title = textbox.value;

        const datePicker = document.getElementById('date-picker');
        const dueDate = datePicker.value;

        createTodo(title, dueDate);
        render();
      }

      const deleteTodo = event => {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeTodo(idToDelete);
        render();
      }

      const checkTodo = event => {
        const checkbox = event.target;

        const todoId = checkbox.dataset.todoId;
        const checked = checkbox.checked;

        toggleTodo(todoId, checked);
        render();
      }

      function onEdit(event) {
        const editButton = event.target;
        const todoId = editButton.dataset.todoId;

        setEditing(todoId);
        render();
      }

      function onUpdate(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById('edit-title-' + todoId);
        const newTitle = textbox.value;

        const datePicker = document.getElementById('edit-date-' + todoId);
        const newDate = datePicker.value;

        updateTodo(todoId, newTitle, newDate);
        render();
      }

// View
      const render = () => {
        // reset our list
        document.getElementById('todo-list').innerHTML = '';

        todos.forEach(todo => {
          const element = document.createElement('div');
          element.innerText = todo.title + "   |   " + todo.dueDate;
            
          // If this todo is being edited, render a textbox, date picker and a
          // button for saving the edits.
          if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.innerText.style = "font-weight: 600;";
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

          // If this todo is not being edited, render what we had before
          // and add an "Edit" button.
          } else {
            element.innerText = todo.title + "   |   " + todo.dueDate;
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);
        }

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.onchange = checkTodo;
          checkbox.dataset.todoId = todo.id;
          if (todo.isDone === true) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
          element.prepend(checkbox);

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.onclick = deleteTodo;
          deleteButton.id = todo.id;
          element.appendChild(deleteButton);
          const todoList = document.getElementById('todo-list');
          todoList.appendChild(element);
        });
      }
      
      render();
