import {
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './slices/todoSlice';

export const store = configureStore({
	reducer: {
		todos: todosSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
