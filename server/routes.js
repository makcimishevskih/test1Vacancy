const { writeFile } = require('fs');
const { readFile } = require('fs/promises');
const bodyParser = require('body-parser');

const dataPath = 'data.json';

module.exports = function (app) {
	app.get('/', async (req, res) => {
		const data = await readFile(__dirname + `/${dataPath}`);

		res.send(data);
		// res.json(data);
		// console.log(`Example app listening on port`);
	});

	app.post('/post', bodyParser.json(), async (req, res) => {
		const data = await readFile(__dirname + `/${dataPath}`);
		let todosData = JSON.parse(data);

		todosData.todos.push(req.body);

		const json = JSON.stringify(todosData);
		writeFile(__dirname + '/data.json', json, (err) => {
			if (err) throw err;

			res.send(req.body);
		});
	});

	app.post('/checkbox', bodyParser.json(), async (req, res) => {
		const data = await readFile(__dirname + '/data.json');
		let dataDB = JSON.parse(data);
		const bodyId = req.body.id;

		dataDB.todos = dataDB.todos.map((el) =>
			el.id === bodyId ? { ...el, checked: !el.checked } : el,
		);
		const json = JSON.stringify(dataDB);
		writeFile(__dirname + '/data.json', json, (err) => {
			if (err) throw err;
			res.json(req.body.id);
		});
	});

	app.get('/clear', bodyParser.json(), async (req, res) => {
		const data = await readFile(__dirname + '/data.json');
		let dataDB = JSON.parse(data);

		dataDB.todos = dataDB.todos.filter((el) => !el.checked);

		const json = JSON.stringify(dataDB);

		writeFile(__dirname + '/data.json', json, (err, r) => {
			if (err) throw err;

			res.send(json);
		});
	});
};
