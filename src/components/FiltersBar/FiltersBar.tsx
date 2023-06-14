import css from './FiltersBar.module.css';

import { useDispatch } from 'react-redux';

import { TypeFilter } from '../../types/types';

import asyncActions from '../../store/asyncActions';
import { AppDispatch, useSelector } from '../../store/store';

interface IProps {
	activeAmount: number;
	activeFilter: string;
	handleChangeFilter: (label: TypeFilter) => void;
}

function FiltersBar({
	activeAmount,
	activeFilter,
	handleChangeFilter,
}: IProps) {
	const filters = useSelector((state) => state.todos.filters);
	const dispatch = useDispatch<AppDispatch>();

	const handleClearCompleted = () => {
		dispatch(asyncActions.fetchClearTask());
	};

	const renderBtns =
		filters &&
		filters.map(({ id, label }) => {
			const clss =
				activeFilter === label
					? `${css.filterBtn} ${css.active}`
					: css.filterBtn;

			return (
				<li
					key={id}
					className={css.filterItem}
					onClick={() => handleChangeFilter(label)}
				>
					<button className={clss}>{label}</button>
				</li>
			);
		});

	return (
		<div className={css.filters}>
			<div className={css.itemsLeft}>{activeAmount} items left</div>
			<ul className={css.filterList}>{renderBtns}</ul>
			<button
				onClick={handleClearCompleted}
				className={css.clear}
			>
				Clear Completed
			</button>
		</div>
	);
}

export default FiltersBar;
