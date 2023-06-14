import css from './TodoList.module.css';

import { forwardRef } from 'react';

import { ITodo } from '../../types/types';

import TodoItem from '../TodoItem/TodoItem';

interface IProps {
	todos: ITodo[];
}

const TodoList = forwardRef(function TodoList(props: IProps, ref: any) {
	return (
		<ul
			ref={ref}
			className={css.list}
		>
			{props.todos.map((props) => (
				<TodoItem
					key={props.id}
					{...props}
				/>
			))}
		</ul>
	);
});

export default TodoList;
