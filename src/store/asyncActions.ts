import { ITodo } from './../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitTodos = createAsyncThunk('todosers/fetchInitTodos', async () => {
	const response = await fetch('http://localhost:3001');

	const data = await response.json();

	console.log(response);
	// console.log(data);
	return data;
});

const fetchTodoTaskChecked = createAsyncThunk(
	'todosers/fetchTodoTaskChecked',
	async (id: string) => {
		const resp = await fetch('http://localhost:3001/checkbox', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		});

		const respObj = await resp.json();
		return respObj;
	},
);

const fetchAddTodoTask = createAsyncThunk(
	'todosers/fetchAddTodoTask',
	async (newTodo: ITodo) => {
		const jsonBody = JSON.stringify(newTodo);

		const response = await fetch('http://localhost:3001/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: jsonBody,
		});

		const respObj = await response.json();
		return respObj;
	},
);

const fetchClearTask = createAsyncThunk('todosers/fetchClearTask', async () => {
	const resp = await fetch('http://localhost:3001/clear');
	const respObj = await resp.json();

	return respObj.todos;
});

const asyncActions = {
	fetchInitTodos,
	fetchClearTask,
	fetchAddTodoTask,
	fetchTodoTaskChecked,
};

export default asyncActions;
