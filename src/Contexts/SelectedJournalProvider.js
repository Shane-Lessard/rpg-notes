import React, {useState} from 'react'

export const SelectedJournalContext = React.createContext({
	selectedJournal: 0,
	setSelectedJournal: () => {},
})

export default function SelectedJournalProvider(props) {

	const [journal, setJournal] = useState(0)

	return (
		<SelectedJournalContext.Provider
			value={{
				selectedJournal: journal,
				setSelectedJournal: setJournal,
			}}
		>
			{props.children}
		</SelectedJournalContext.Provider>
	)
}
