import Dexie from 'dexie'

const db = new Dexie('rpg-notes')
db.version(1).stores({
	journals: '++id,&name',
	characters: '++id,name,npc,journal_id',
	places: '++id,name,journal_id',
	quests: '++id,name,complete,journal_id',
	items: '++id,name,journal_id',
	events: '++id,name,journal_id',
})
db.open().then(() => {
	console.log('database opened')
}).catch(function(e) {
	console.error('Open failed: ' + e.stack)
})

export default class Service {
	constructor() {
		this._store = db
	}

	get store() {
		return this._store
	}

	set store(store) {
		this._store = store
	}

}
