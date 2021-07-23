import React, {useContext} from 'react'
import Page from '../Components/Page'
import JournalService from '../Services/JournalService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core'
import Confirm from '../Components/Confirm'
import {JournalListContext} from '../Contexts/JournalListProvider'
import EditJournalDialog from '../Components/EditJournalDialog'

const journalService = new JournalService()

export default function Journals() {

	const {journalList, fetchJournalList} = useContext(JournalListContext)

	async function destroyJournal(id) {
		await journalService.destroy(id)
		fetchJournalList()
	}

	return (
		<Page>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h4">
						Journals
					</Typography>
				</Grid>
				{journalList.map((journal, index) => {
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
									<EditJournalDialog journalId={journal.id} />
								</CardActions>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		</Page>
	)
}
