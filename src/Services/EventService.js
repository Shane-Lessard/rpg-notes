import Service from './Service'

export default class EventService extends Service {

	async index(journal_id = null) {
		if (journal_id && !isNaN(journal_id)) {
			return this.store.transaction('rw', this.store.events,
				async () => {
					return this.store.events.where('journal_id').
						equals(journal_id).
						toArray()
				})
		}
		return this.store.transaction('rw', this.store.events, async () => {
			return this.store.events.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.events, async () => {
			return this.store.events.where('id').equals(id).first()
		})
	}

	async create(event) {
		return this.store.transaction('rw', this.store.events, async () => {
			return this.store.events.add(event)
		})
	}

	async update(id, event) {
		return this.store.transaction('rw', this.store.events, async () => {
			return this.store.events.update(id, event)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.events, async () => {
			return this.store.events.where('id').equals(id).delete()
		})
	}

}
