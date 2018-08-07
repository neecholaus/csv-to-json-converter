import sys

args = sys.argv;

current_file = args[1] if len(args) > 1 else 'csv.csv'
new_file = args[2] if len(args) > 2 else 'json.json'

file = open(current_file, 'r').read()

file = file.split('\n')


for i in range(len(file)):
	if file[i] == '':
		file.remove('');


headers_string = file[0]

headers_array = headers_string.split(',')

rows_array = file[1:]

for i in rows_array:
	row = i.replace(',,', ', ,')
	split_row = i.split(',')

	data = {}

	for j in range(len(split_row)):
		data[headers_array[j]] = split_row[j]

	print data
