const fs = require('fs');

const args = process.argv;

var file_name = args[2] ? args[2] : './csv.csv';

var new_file_name = args[3] ? args[3] : './json.json';

// Get file
fs.readFile(file_name, 'utf8', (error, res) => {
	if(error) {
		console.log(error.code == 'ENOENT' ? 'File was not found.' : 'Something went wrong, please try again.');
		return;
	}

	// Parse headers
	let headers_string = res.split(/\n/)[0];
	let headers_array = headers_string.split(',');


	// Parse rows
	let data = res.split(/\n/);

	data.shift();

	let data_array = data;

	// Remove empty string items.
	// Some csv files give two line breaks instead of one, leaving an empty string in between actual data
	for(i = 0; i < data_array.length; i++) {
		if(data_array[i] === '') {
			data_array.splice(i, 1);
			i--;
		}
	}


	// Join corresponding headers and rows into an object
	let rows = [];
	for(i = 0; i < data_array.length; i++) {
		// Fix more than one sequential comma
		data_array[i] = data_array[i].replace(/,((?!")(?! ))/g, '," "');

		data_array[i] = data_array[i].replace(/(?<="),/g, '^^^');

		data_array[i] = data_array[i].split('^^^');

		let object = {};

		for(j = 0; j < data_array[i].length; j++) {
			object[headers_array[j]] = data_array[i][j];
		}
		console.log(data_array[i].length, i);

		rows.push(object);
	}

	// Write JSON to new file
	fs.writeFile(new_file_name, JSON.stringify(rows), 'utf8', (error) => {
		if(error) {
			console.log('Something went wrong when saving the JSON file.');
			return;
		}

		console.log(`The JSON file was saved as ${new_file_name}`);
	});
});
