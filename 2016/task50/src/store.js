const KEY = 'survey'

if(!window.localStorage.getItem(KEY)){
	let data = {
		formList: []
	};
	localStorage.setItem(KEY, JSON.stringify(data));
}

export default {
	fetch () {
		return JSON.parse(window.localStorage.getItem(KEY) || '{}')
	},
	save (store) {
		window.localStorage.setItem(KEY, JSON.stringify(store))
	}
}