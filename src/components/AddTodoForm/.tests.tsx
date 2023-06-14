// import 'nanoid';
// import { useSelector } from 'react-redux';
// const { configureStore } = require('redux-mock-store'); //CommonJS

// import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import { IInitialState } from '../../types/types';

// import TodoList from '../TodoList';
// import Title from '../ui/Title';

// import App from '../core/App';

// jest.mock('nanoid');

// jest.mock('nanoid', () => {
// 	return { nanoid: () => '1234' };

// jest.mock('react-redux', () => {
// 	return { useSelector: () => [] };
// });


// });describe('>>>H O M E --- REACT-REDUX (Shallow + passing the {store} directly)',()=>{
//     const initialState = { output:100 };
//     const mockStore = configureStore();
//     let store;
// 		let container;

//     beforeEach(()=>{
//         store = mockStore(initialState);
//         container = shallow(<App store={store} /> );
//     })

//     it('+++ render the connected(SMART) component', () => {
//        expect(container.length).toEqual(1);
//     });

//     it('+++ check Prop matches with initialState', () => {
//        expect(container.prop('output')).toEqual(initialState.output);
//     });

// const initialState: IInitialState = {
// 	todos: [],
// 	filters: [],
// 	loading: 'idle',
// };
// jest.mock('react-redux', () => ({
// 	...jest.requireActual('react-redux'),
// 	useSelector: jest.fn().mockReturnValueOnce(initialState),
// }));

// describe('App', () => {
// 	// afterEach(() => {
// 	// 	useSelector.mockClear();
// 	// });
// 	it('App render', () => {
// 		render(<App />);
// 		// expect(...)
// 	});
// });

// describe('Components', () => {
// test('TodoList', () => {
// 	render(<TodoList todos={[]} />);
// });
// test('App', () => {
// render(<App />);
// expect(screen.getByText(/id: 1234/i)).toBeInTheDocument();
// expect(screen.getByText('todos')).toBeInTheDocument();
// });
// });

// <Title
// 	tag='h1'
// 	text='qweqwe'
// 	className='asdqweqwe'
// />,
// );
// });

// test('Input', () => {
// 	render(input);
// 		// <Title
// 		// 	tag='h1'
// 		// 	text='qweqwe'
// 		// 	className='asdqweqwe'
// 		// />,
// 	// );
// 	expect(screen.getByPlaceholderText(/What needs to be done/i)).toBeInTheDocument();
// });

// 1. describe (name, fn) - собирает пачку тестов
// 2. it или test(name, fn) - отдельный тест
// 3. screen - доступ к странице
// 3. expect - ожидание чего-либо
// 3. toBeInTheDocument - есть ли элемент на странице

// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// });
// it('Some', () => {
// 	const component = renderer.create(<Some />);
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// });

// 1. ------------------------------------------------>
// Сравнение примитивов

// test('My first test', () => {
// 	expect(Math.max(1, 5, 10)).toBe(10);
// });
// test('My first test1', () => {
// 	expect(Math.max(1, 5, 10)).toBe(5);
// });

// 2. ------------------------------------------------>
// Сравнение объектов рекурсивно .toEqual

// test('toEqual with objects', () => {
// 	expect({ foo: 'foo', subObject: { baz: 'baz' } }).toEqual({
// 		foo: 'foo',
// 		subObject: { baz: 'baz' },
// 	}); // Ок
// 	expect({ foo: 'foo', subObject: { num: 0 } }).toEqual({
// 		foo: 'foo',
// 		subObject: { baz: 'baz' },
// 	}); // А вот так ошибка.
// });
// test('toEqual with arrays', () => {
// 	expect([11, 19, 5]).toEqual([11, 19, 5]); // Ок
// 	expect([11, 19, 5]).toEqual([11, 19]); // Ошибка
// });

// 3. ------------------------------------------------>
// Есть ли значение в массиве или объекте .toContain

// const arr = ['apple', 'orange', 'banana'];
// expect(arr).toContain('banana');
// expect(new Set(arr)).toContain('banana');
// expect('apple, orange, banana').toContain('banana');

// 4. ------------------------------------------------>
// Есть ли в массиве элемент .toContainEqual

// expect([{a: 1}, {b: 2}]).toContainEqual({a: 1});

// 5. ------------------------------------------------>
// Проверяет на длину .toHaveLength

// expect([1, 2, 3, 4]).toHaveLength(4);
// expect('foo').toHaveLength(3);
// expect({ length: 1 }).toHaveLength(1);

// 6. ------------------------------------------------>
// Для чисел с плавающей точкой где незначительна минимальная разница toBeCloseTo
// const num = 0.1 + 0.2; // 0.30000000000000004
// expect(num).toBeCloseTo(0.3);
// expect(Math.PI).toBeCloseTo(3.14, 2);

// 7. ------------------------------------------------>
//  проверяет соответствие строки регулярному выражению. toMatch
// expect('Banana').toMatch(/Ba/);

// 8. ------------------------------------------------>
// когда надо проверить исключение .toThrow
// function funcWithError() {
// 	throw new Error('some error');
// }
// expect(funcWithError).toThrow();
// expect(funcWithError).toThrow(Error);
// expect(funcWithError).toThrow('some error');
// expect(funcWithError).toThrow(/some/);

// 9. ------------------------------------------------>
// проверки на НЕравенство .not
// expect(true).not.toBe(false);
// expect({ foo: 'bar' }).not.toEqual({});

// 10. ------------------------------------------------>

// function funcWithoutError() {}
// expect(funcWithoutError).not.toThrow();

// 1. toBe() — подходит, если нам надо сравнивать примитивные значения или является ли переданное значение ссылкой на тот же объект, что указан как ожидаемое значение. Сравниваются значения при помощи Object.is(). В отличие от === это дает возможность отличать 0 от -0, проверить равенство NaN c NaN.
// 2. toEqual() — подойдёт, если нам необходимо сравнить структуру более сложных типов. Он сравнит все поля переданного объекта с ожидаемым. Проверит каждый элемент массива. И сделает это рекурсивно по всей вложенности.
// 3. toContain() — проверят содержит массив или итерируемый объект значение. Для сравнения используется оператор ===.
// 4. toContainEqual() — проверяет или содержит массив элемент с ожидаемой структурой.
// 5. toHaveLength() — проверяет или свойство length у объекта соответствует ожидаемому.
// 6. toBeCloseTo() — удобно использовать для чисел с плавающей запятой, когда вам не важна точность и вы не хотите, чтобы тест зависел от незначительной разницы в дроби. Вторым аргументом можно передать до какого знака после запятой необходима точность при сравнении.
// 7. toMatch() — проверяет соответствие строки регулярному выражению.
// 8. toThrow() — используется в случаях, когда надо проверить исключение. Можно проверить как сам факт ошибки, так и проверить на выброс исключения определенного класса, либо по сообщению ошибки, либо по соответствию сообщения регулярному выражению.
// 9. not — это свойство позволяет сделать проверки на НЕравенство. Оно предоставляет объект, который имеет все методы перечисленные выше, но работать они будут наоборот.

// toBeNull() — проверяет на равенство с null.
// toBeUndefined() — проверяет на равенство с undefined.
// toBeDefined() — противоположность toBeUndefined. Проверяет или значение !== undefined.
// toBeTruthy() — проверяет или в булевом контексте значение соответствует true. Тоесть любые значения кроме false, null, undefined, 0, NaN и пустых строк.
// toBeFalsy() — противоположность toBeTruthy(). Проверяет или в булевом контексте значение соответствует false.
// toBeGreaterThan() и toBeGreaterThanOrEqual() — первый метод проверяет или переданное числовое значение больше, чем ожидаемое >, второй проверяет больше или равно ожидаемому >=.
// toBeLessThan() и toBeLessThanOrEqual() — противоположность toBeGreaterThan() и toBeGreaterThanOrEqual()

// const products = [
// 	{ name: 'onion', price: 12 },
// 	{ name: 'tomato', price: 26 },
// 	{ name: 'banana', price: 29 },
// 	{ name: 'orange', price: 38 },
// ];
// const byPriceRange = (products, min, max) =>
// 	products.filter((item) => item.price >= min && item.price <= max);
// test('Test product filter by range', () => {
// 	const FROM = 15;
// 	const TO = 30;
// 	const filteredProducts = byPriceRange(products, FROM, TO);
// expect(filteredProducts).toHaveLength(2);
// expect(filteredProducts).toContainEqual({ name: 'tomato', price: 26 });
// expect(filteredProducts).toEqual([
// 	{ name: 'tomato', price: 26 },
// 	{ name: 'banana', price: 29 },
// ]);
// expect(filteredProducts[0].price).toBeGreaterThanOrEqual(FROM);
// expect(filteredProducts[1].price).toBeLessThanOrEqual(TO);
// expect(filteredProducts).not.toContainEqual({ name: 'orange', price: 38 });
// });
