import Service from './Service'

export default class CharacterService extends Service {

	async index(journal_id = null) {
		if (journal_id && !isNaN(journal_id)) {
			return this.store.transaction('rw', this.store.characters,
				async () => {
					return this.store.characters.where('journal_id').equals(journal_id).sortBy('npc')
				})
		}
		return this.store.transaction('rw', this.store.characters, async () => {
			return this.store.characters.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.characters, async () => {
			return this.store.characters.where('id').equals(id).first()
		})
	}

	async create(character) {
		return this.store.transaction('rw', this.store.characters, async () => {
			return this.store.characters.add(character)
		})
	}

	async update(id, character) {
		return this.store.transaction('rw', this.store.characters, async () => {
			return this.store.characters.update(id, character)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.characters, async () => {
			return this.store.characters.where('id').equals(id).delete()
		})
	}

}
