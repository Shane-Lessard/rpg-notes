import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import JournalService from '../Services/JournalService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core'
import Confirm from '../Components/Confirm'

const journalService = new JournalService()

export default function Journals() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [journals, setJournals] = useState([])

	async function fetchJournals(journalId) {
		setJournals(await journalService.index(journalId))
	}

	useEffect(() => {
		fetchJournals(selectedJournal)
	}, [selectedJournal])

	async function destroyJournal(id) {
		await journalService.destroy(id)
		fetchJournals(selectedJournal)
	}

	return (
		<Page>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h4">
						Journals
					</Typography>
				</Grid>
				{journals.map((journal, index) => {
					return (
						<Grid item xs={12} md={6} key={index}>
							<Card className={'fullHeight'}>
								<CardContent>
									<Typography variant="h5">
										{journal.name}
									</Typography>
								</CardContent>
								<div className={'flexGrow'}/>
								<CardActions>
									<Confirm
										message={`Are you sure you want to delete ${journal.name}?`}
										onConfirm={() => destroyJournal(
											journal.id)}
									/>
								</CardActions>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		</Page>
	)
}
