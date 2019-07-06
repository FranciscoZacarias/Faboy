from bs4 import BeautifulSoup
import requests, json, sys

try:
	keyword = sys.argv[1]
except:
	keyword = "garfield"

domain = 'https://pirateproxy.bet'
url = domain + '/search/' + keyword.replace(' ', '%20') + '/0/99/0'

source = requests.get(url).text
soup = BeautifulSoup(source, 'lxml')
div = soup.body.find('div', {"id": "SearchResults"}).find('div', {"id": "main-content"})
table = div.find('table', {"id": "searchResult"})

i = 0
category, plataform, seeders, leechers, name, url, magnet, title, uploaded, size, by =\
[], [], [], [], [], [], [], [], [], [], []

for torrent in table.find_all('tr'):
	if i == 0:
		i = i + 1 
		continue
	a = torrent.find_all('a')
	category.append(a[0].text)
	plataform.append(a[1].text)

	td_ls = torrent.find_all('td', {"align":"right"})
	seeders.append(td_ls[0].text)
	leechers.append(td_ls[1].text)
	name.append(a[2].text)
	url.append(domain + a[2]['href'])
	magnet.append(a[3]['href'])
	try:
		title_game = a[4].img['title']
	except:
		title_game = "No Title"
	title.append(title_game)

	sub_text = torrent.find('font').text.split(',') # 0 - Date Upload, Size, By
	uploaded.append(sub_text[0].replace('Uploaded ', ''))
	size.append(sub_text[1].replace(' Size ', ''))
	by.append(sub_text[2].replace(' Uled by ', ''))

torrent_dict = [{'Category': cat, 'Plataform': plat, 'Seeders': seed, 'Leechers': leec, 'Name': name,\
				'URL': url, 'Magnet': mag, 'Title': title, 'Uploaded': upl, 'Size': size, 'By': by} 
				for cat, plat, seed, leec, name, url, mag, title, upl, size, by in \
				zip(category, plataform, seeders, leechers, name, url, magnet, title, uploaded, size, by)]

print(json.dumps(torrent_dict))
sys.stdout.flush()
