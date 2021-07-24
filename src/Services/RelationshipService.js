import Service from './Service'

export default class RelationshipService extends Service {

	async attach(table, tableId, join, joinId){
		return this.store.transaction('rw', this.store.relationships, async () => {
			return this.store.relationships.add({
				table: table,
				tableId: tableId,
				join: join,
				joinId: joinId
			})
		})
	}

	async detach(table, tableId, join, joinId){
		return this.store.transaction('rw', this.store.relationships, async () => {
			return this.store.relationships
				.where('table').equals(table)
				.and(item => item.join === join)
				.and(item => item.tableId === tableId)
				.and(item => item.joinId === joinId)
				.delete()
		})
	}

	async list(type, id){
		const list = await this.store.transaction('rw', this.store.relationships, async () => {
			return this.store.relationships
				.where('table').equals(type)
				.and(item => item.tableId === id)
				.toArray()
		})

		const reverse = await this.store.transaction('rw', this.store.relationships, async () => {
			return this.store.relationships
				.where('join').equals(type)
				.and(item => item.joinId === id)
				.toArray()
		})

		const listEntries = list.map(async item => {
			return this.store.transaction('rw', this.store[item.join], async () => {
				return {
					content: await this.store[item.join].where('id').equals(item.joinId).first(),
					type: item.join
				}
			})
		})

		const reverseEntries = reverse.map(async item => {
			return this.store.transaction('rw', this.store[item.table], async () => {
				return {
					content: await this.store[item.table].where('id').equals(item.tableId).first(),
					type: item.table
				}
			})
		})


		const combinedPromises = listEntries.concat(reverseEntries)

		const resolvedList = await Promise.all(combinedPromises)

		return resolvedList.flat()

	}

}
