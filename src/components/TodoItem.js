import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';

const TodoItem = (({TodoStore,todo }) => {
  return (
    <div>
      <div key={todo.id} className="todo-item">
        <div className="todo-item-left">
          <input type="checkbox" onChange={(event) => TodoStore.checkTodo(todo, event)} checked={todo.completed} />

          {!todo.editing &&
          <div
            className={classnames({'todo-item-label': true, 'completed': todo.completed})}
            onDoubleClick={(event) => TodoStore.editTodo(todo, event)}
          >
            {todo.title}
          </div>
          }

          {todo.editing &&
          <input
            className="todo-item-edit" type="text" autoFocus
            defaultValue={todo.title}
            onBlur={(event) => TodoStore.doneEdit(todo, event)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                TodoStore.doneEdit(todo, event);
              } else if (event.key === 'Escape') {
                TodoStore.cancelEdit(todo, event);
              }
            }}
          />
          }

        </div>
        <div className="remove-item" onClick={(event) => TodoStore.deleteTodo(todo.id)}>
          &times;
        </div>
      </div>
    </div>
  );
});



export default inject('TodoStore')(observer(TodoItem));
