export type TypeFilter = 'All' | 'Completed' | 'Active';
export type TypeLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface IFilters {
	id: string;
	label: TypeFilter;
}

export interface ITodo {
	id: string;
	label: string;
	checked: boolean;
	createdAt: string;
}

export interface IInitialState {
	todos: ITodo[];
	loading: TypeLoading;
	filters: IFilters[];
	// error: '';
}
