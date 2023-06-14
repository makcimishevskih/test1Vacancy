import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, ITodo } from '../../types/types';
import asyncActions from '../asyncActions';

let initialState: IInitialState = {
	todos: [],
	filters: [],
	loading: 'idle',
};

const todosSlice = createSlice({
	name: 'todos',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(asyncActions.fetchInitTodos.pending, (state) => {
				if (state.loading === 'idle') {
					state.loading = 'pending';
				}
			})
			.addCase(asyncActions.fetchInitTodos.fulfilled, (state, action) => {
				if (state.loading === 'pending') {
					state.todos = action.payload.todos;
					state.filters = action.payload.filters;
					state.loading = 'idle';
				}
			})
			.addCase(asyncActions.fetchInitTodos.rejected, (state, action) => {
				if (
					state.loading === 'pending' &&
					JSON.stringify(state.todos) !== JSON.stringify(action.payload)
				) {
					state.loading = 'idle';
					state.todos = [];
					// state.error = action.error;
				}
			})
			.addCase(asyncActions.fetchAddTodoTask.pending, (state) => {
				if (state.loading === 'idle') {
					state.loading = 'pending';
				}
			})
			.addCase(
				asyncActions.fetchAddTodoTask.fulfilled,
				(state, action: PayloadAction<ITodo>) => {
					if (state.loading === 'pending') {
						state.todos.push(action.payload);
						state.loading = 'idle';
					}
				},
			)
			.addCase(asyncActions.fetchAddTodoTask.rejected, (state, action) => {
				if (
					state.loading === 'pending' &&
					JSON.stringify(state.todos) !== JSON.stringify(action.payload)
				) {
					state.loading = 'idle';
					// state.error = action.error;
				}
			})
			.addCase(asyncActions.fetchTodoTaskChecked.pending, (state) => {
				if (state.loading === 'idle') {
					state.loading = 'pending';
				}
			})
			.addCase(asyncActions.fetchTodoTaskChecked.fulfilled, (state, action) => {
				if (state.loading === 'pending') {
					const id = action.payload;
					const a = state.todos.find((el) => el.id === id);
					state.loading = 'idle';
					if (a) {
						a.checked = !a.checked;
					}
				}
			})
			.addCase(asyncActions.fetchTodoTaskChecked.rejected, (state, action) => {
				if (
					state.loading === 'pending' &&
					JSON.stringify(state.todos) !== JSON.stringify(action.payload)
				) {
					state.loading = 'idle';
					state.todos = [];
					// state.error = action.error;
				}
			})
			.addCase(asyncActions.fetchClearTask.pending, (state) => {
				if (state.loading === 'idle') {
					state.loading = 'pending';
				}
			})
			.addCase(asyncActions.fetchClearTask.fulfilled, (state, action) => {
				if (state.loading === 'pending') {
					state.todos = action.payload;
					state.loading = 'idle';
				}
			})
			.addCase(asyncActions.fetchClearTask.rejected, (state, action) => {
				if (
					state.loading === 'pending' &&
					JSON.stringify(state.todos) !== JSON.stringify(action.payload)
				) {
					state.loading = 'idle';
					// state.error = action.error;
				}
			});
	},
});

export default todosSlice.reducer;
