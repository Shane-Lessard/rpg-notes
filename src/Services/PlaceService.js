import Service from './Service'

export default class PlaceService extends Service {

	async index(journal_id = null) {
		if (journal_id && !isNaN(journal_id)) {
			return this.store.transaction('rw', this.store.places,
				async () => {
					return this.store.places.where('journal_id').equals(journal_id).toArray()
				})
		}
		return this.store.transaction('rw', this.store.places, async () => {
			return this.store.places.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.places, async () => {
			return this.store.places.where('id').equals(id).first()
		})
	}

	async create(place) {
		return this.store.transaction('rw', this.store.places, async () => {
			return this.store.places.add(place)
		})
	}

	async update(id, place) {
		return this.store.transaction('rw', this.store.places, async () => {
			return this.store.places.update(id, place)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.places, async () => {
			return this.store.places.where('id').equals(id).delete()
		})
	}

}
