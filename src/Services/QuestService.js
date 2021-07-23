import Service from './Service'

export default class QuestService extends Service {

	async index(journal_id = null) {
		if (journal_id && !isNaN(journal_id)) {
			return this.store.transaction('rw', this.store.quests,
				async () => {
					return this.store.quests.where('journal_id').equals(journal_id).sortBy('complete')
				})
		}
		return this.store.transaction('rw', this.store.quests, async () => {
			return this.store.quests.toArray()
		})
	}

	async show(id) {
		return this.store.transaction('rw', this.store.quests, async () => {
			return this.store.quests.where('id').equals(id).first()
		})
	}

	async create(quest) {
		return this.store.transaction('rw', this.store.quests, async () => {
			return this.store.quests.add(quest)
		})
	}

	async update(id, quest) {
		return this.store.transaction('rw', this.store.quests, async () => {
			return this.store.quests.update(id, quest)
		})
	}

	async destroy(id) {
		return this.store.transaction('rw', this.store.quests, async () => {
			return this.store.quests.where('id').equals(id).delete()
		})
	}

}
