export const validateTodo = (todoText: string) => {
	const text = todoText.trim();

	const regNums = /^(?![\d+_@.-]+$)[\sa-zA-ZА-Яа-я0-9+_@.-]*$/;

	const validLength = 4;

	if (!text) {
		console.log('Введите текст задачи...');
		return 'Введите текст задачи...';
	} else if (text.length < validLength) {
		console.log(`Введите больше ${validLength} символов...`);
		return `Введите больше ${validLength} символов...`;
	} else if (!regNums.test(text)) {
		console.log('Введите текст...');
		return 'Введите символ буквы...';
	}
	return '';
};
