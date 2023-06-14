import './App.css';
import './animate.css';

import { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useSelector } from '../../store/store';

import Title from '../ui/Title';
import TodoList from '../TodoList';
import FiltersBar from '../FiltersBar';
import AddTodoForm from '../AddTodoForm';

import asyncActions from '../../store/asyncActions';

import { TypeFilter } from '../../types/types';

// FOCUS TODO INPUT STYLES
// STYLES MIN HEIGHT

function App() {
	const { todos } = useSelector((state) => state.todos);
	const dispatch = useDispatch<AppDispatch>();

	const [activeFilter, setActiveFilter] = useState<TypeFilter>('All');
	const [isOpenList, setIsOpenList] = useState<boolean>(true);

	const nodeRef = useRef<HTMLUListElement>(null);
	const animationDuration = 200;

	useEffect(() => {
		dispatch(asyncActions.fetchInitTodos());
		// eslint-disable-next-line
	}, []);

	const activeTodosCount = useMemo(() => {
		if (todos && !todos.length) return todos.length;
		return todos.filter((el) => !el.checked).length;
	}, [todos]);

	const filteredTodos = useMemo(() => {
		if (activeFilter === 'All') return todos;

		return todos.filter((el) => {
			switch (activeFilter) {
				case 'Completed':
					return el.checked;
				case 'Active':
					return !el.checked;
				default:
					return el;
			}
		});
	}, [activeFilter, todos]);

	const handleCheckbox = () => {
		setIsOpenList(!isOpenList);
	};

	const handleChangeFilter = (label: TypeFilter) => {
		setActiveFilter(label);
	};

	const cls = isOpenList ? 'wrapper active' : 'wrapper';
	return (
		<div className='app'>
			{/* <div className='wrapper card0'> */}
			<div className={`${cls} card0`}>
				<Title
					tag='h1'
					text='todos'
					className='title'
				/>

				<div className='content'>
					<AddTodoForm
						isOpenList={isOpenList}
						handleCheckbox={handleCheckbox}
					/>
					<CSSTransition
						in={isOpenList}
						nodeRef={nodeRef}
						classNames='my-list'
						timeout={{
							enter: animationDuration,
							exit: animationDuration,
						}}
						unmountOnExit
						mountOnEnter
					>
						<div className='listWrapper'>
							<TodoList
								ref={nodeRef}
								todos={activeFilter === 'All' ? todos : filteredTodos}
							/>
						</div>
					</CSSTransition>
					<FiltersBar
						activeFilter={activeFilter}
						handleChangeFilter={handleChangeFilter}
						activeAmount={activeTodosCount}
					/>
				</div>
				<div className='card1'></div>
				<div className='card2'></div>
			</div>
		</div>
	);
}

export default App;
