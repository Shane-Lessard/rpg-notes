import React from 'react'
import JournalListProvider from './Contexts/JournalListProvider'
import SelectedJournalProvider from './Contexts/SelectedJournalProvider'

export default function State(props){
	//collect all global app providers
	return (
		<JournalListProvider>
			<SelectedJournalProvider>
				{props.children}
			</SelectedJournalProvider>
		</JournalListProvider>
	)

}
