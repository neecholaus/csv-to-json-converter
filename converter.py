import sys
import json
import os
import re

args = sys.argv;

current_file_name = args[1] if len(args) > 1 else 'csv.csv'
new_file_name = args[2] if len(args) > 2 else 'json.json'

try:
	file = open(current_file_name, 'r').read()
except: 
	print "File was not found."
	exit()

file = file.split('\n')


for i in range(len(file)):
	if file[i] == '':
		file.remove('');


headers_string = file[0]

headers_array = headers_string.split(',')

rows_array = file[1:]

bad = 0

master = []

for i in range(len(rows_array)):
	row = re.sub(r',((?!")(?! ))', '," "', rows_array[i])

	row = re.sub(r'(?<="),', '^^^', row)

	split_row = row.split('^^^')

	data = {}

	for j in range(len(split_row)):
		data[headers_array[j]] = split_row[j]

	master.append(data)


new_file = open(new_file_name, 'w')

try:
	new_file.write(json.dumps(master))
except:
	os.remove(new_file_name)
	print 'Something went wrong. The file was not saved.'
	exit()


print 'JSON was successfully saved to %s' %(new_file_name)








