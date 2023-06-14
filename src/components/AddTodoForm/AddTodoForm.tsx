import css from './AddTodoForm.module.css';

import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { useState, ChangeEvent, FormEvent } from 'react';

import { ITodo } from '../../types/types';

import { validateTodo } from '../../helpers/validate';

import { BallTriangle } from 'react-loader-spinner';

import asyncActions from '../../store/asyncActions';
import useInput from '../../helpers/hooks/useInput';

interface IProps {
	isOpenList: boolean;
	handleCheckbox: () => void;
}

function AddTodoForm({ isOpenList, handleCheckbox }: IProps) {
	const { todos, loading } = useSelector((state) => state.todos);
	const dispatch = useDispatch<AppDispatch>();

	// const [error, setError] = useState<string>('');
	const [
		taskText,
		resetTaskTextValue,
		error,
		handleErrorValue,
		{ handleInputChange: onTaskTextChange },
	] = useInput('');

	const animClasses = error ? `${css.error} ${css.active}` : css.error;

	const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const findTaskTextInState = todos.find((el) => el.label === taskText);
		const valid = validateTodo(taskText.trim());

		if (findTaskTextInState) {
			console.log(findTaskTextInState);
			handleErrorValue('Задача уже есть в вашем списке');

			return;
		} else if (valid) {
			handleErrorValue(valid);
			return;
		}

		const newTodo: ITodo = {
			id: nanoid(),
			label: taskText,
			checked: false,
			createdAt: JSON.stringify(new Date()),
		};

		dispatch(asyncActions.fetchAddTodoTask(newTodo));
		resetTaskTextValue('');
	};

	return (
		<>
			<form
				onSubmit={handleAddTask}
				className={css.addTaskForm}
			>
				<div className={css.checkboxWrapper}>
					<input
						id='todoCheckbox'
						type='checkbox'
						className={css.todosCheckbox}
						onChange={handleCheckbox}
						checked={isOpenList ? true : false}
					/>
					<label htmlFor='todoCheckbox'></label>
				</div>
				<div className={css.inputWrapper}>
					<input
						className={css.todosInput}
						type='text'
						value={taskText}
						onChange={onTaskTextChange}
						placeholder='What needs to be done?'
					/>
				</div>
				{loading === 'pending' ? (
					<BallTriangle
						height={40}
						width={40}
						radius={5}
						color='#000'
						wrapperClass={css.ballTriangleLoader}
						ariaLabel='ball-triangle-loading'
						visible={true}
					/>
				) : null}
			</form>
			<div className={animClasses}>{error}</div>
		</>
	);
}

export default AddTodoForm;
