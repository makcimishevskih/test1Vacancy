const express = require('express');

const app = express();

// const PORT = process.env.PORT || 3001;
const PORT = 3001;

app.use((req, res, next) => {
	// CORS DISABLE
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type',
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

require('./routes')(app);

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
