import Service from './Service'

export default class ItemService extends Service {

	async index(journal_id = null) {
		if (journal_id && !isNaN(journal_id)) {
			return this.store.transaction('rw', this.store.items,
				async () => {
					return this.store.items.where('journal_id').equals(journal_id).toArray()
				})
		}
		return this.store.transaction('rw', this.store.items, async () => {
			return this.store.items.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.items, async () => {
			return this.store.items.where('id').equals(id).first()
		})
	}

	async create(item) {
		return this.store.transaction('rw', this.store.items, async () => {
			return this.store.items.add(item)
		})
	}

	async update(id, item) {
		return this.store.transaction('rw', this.store.items, async () => {
			return this.store.items.update(id, item)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.items, async () => {
			return this.store.items.where('id').equals(id).delete()
		})
	}

}
