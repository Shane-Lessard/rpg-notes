import Service from './Service'

export default class JournalService extends Service {

	async index() {
		return this.store.transaction('rw', this.store.journals, async () => {
			return this.store.journals.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.journals, async () => {
			return this.store.journals.where('id').equals(id).first()
		})
	}

	async create(journal) {
		return this.store.transaction('rw', this.store.journals, async () => {
			return this.store.journals.add(journal)
		})
	}

	async update(id, journal) {
		return this.store.transaction('rw', this.store.journals, async () => {
			return this.store.journals.update(id, journal)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.journals, async () => {
			return this.store.journals.where('id').equals(id).delete()
		})
	}

}
