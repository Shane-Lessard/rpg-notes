import React, {useEffect, useState} from 'react'
import JournalService from '../Services/JournalService'

export const JournalListContext = React.createContext({
	journalList: [],
	fetchJournalList: () => {},
})

export default function JournalListProvider(props) {

	const journalService = new JournalService()

	const [journalList, setJournalList] = useState([])

	useEffect(() => {
		fetchJournalList()
		// eslint-disable-next-line
	}, [journalList])

	async function fetchJournalList() {
		setJournalList(await journalService.index())
	}

	return (
		<JournalListContext.Provider
			value={{
				journalList: journalList,
				fetchJournalList: fetchJournalList,
			}}
		>
			{props.children}
		</JournalListContext.Provider>
	)

}
