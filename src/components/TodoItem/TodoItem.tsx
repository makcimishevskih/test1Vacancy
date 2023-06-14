import css from './TodoItem.module.css';

import { useDispatch } from 'react-redux';

import { ITodo } from '../../types/types';

import { AppDispatch } from '../../store/store';
import asyncActions from '../../store/asyncActions';

const TodoItem = ({ id, checked, label, createdAt }: ITodo) => {
	const dispatch = useDispatch<AppDispatch>();
	const parseCreatedAt: Date = new Date(JSON.parse(createdAt));

	const handleCheckbox = (id: string) => {
		dispatch(asyncActions.fetchTodoTaskChecked(id));
	};

	return (
		<li
			key={id}
			className={css.listItem}
		>
			<input
				id={`listItemCheckbox${id}`}
				className={css.listItemCheckbox}
				type='checkbox'
				checked={checked ? true : false}
				onChange={() => handleCheckbox(id)}
			/>

			<label htmlFor={`listItemCheckbox${id}`}>
				<span>{label}</span>
			</label>
			<div className={css.dates}>
				<span>{parseCreatedAt && parseCreatedAt.toLocaleTimeString()}</span>
				<span>{parseCreatedAt && parseCreatedAt.toLocaleDateString()}</span>
			</div>
		</li>
	);
};

export default TodoItem;
