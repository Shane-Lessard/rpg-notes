import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import EventService from '../Services/EventService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import AddEventDialog from '../Components/Events/AddEventDialog'
import EditEventDialog from '../Components/Events/EditEventDialog'
import Confirm from '../Components/Confirm'
import JournalSelector from '../Components/JournalSelector'

const eventService = new EventService()

export default function Events() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [events, setEvents] = useState([])

	async function fetchEvents(journalId) {
		setEvents(await eventService.index(journalId))
	}

	useEffect(() => {
		fetchEvents(selectedJournal)
	}, [selectedJournal])

	const [addEventDialog, setAddEventDialog] = useState(false)

	function openAddEventDialog() {
		setAddEventDialog(true)
	}

	function closeAddEventDialog() {
		fetchEvents(selectedJournal)
		setAddEventDialog(false)
	}

	async function destroyEvent(id) {
		await eventService.destroy(id)
		fetchEvents(selectedJournal)
	}

	return (
		<Page>
			{
				!selectedJournal ?
					<div style={{margin: 'auto'}}>
						Please Select a Journal
						<JournalSelector/>
					</div>
					:
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant="h4">
								<AddEventDialog open={addEventDialog}
												onClose={() => closeAddEventDialog()}/>
								<IconButton
									onClick={() => openAddEventDialog()}>
									<AddOutlined/>
								</IconButton>
								Events
							</Typography>
						</Grid>
						{events.map((event, index) => {
							return (
								<Grid item xs={12} md={6} key={index}>
									<Card className={'fullHeight'}>
										<CardContent>
											<Typography variant="h5"
														className={'wrapIcon'}>
											</Typography>
											<Typography
												variant="body2"
												dangerouslySetInnerHTML={{
													__html: event.notes?.substring(
														0, 300),
												}}
											/>
										</CardContent>
										<div className={'flexGrow'}/>
										<CardActions>
											<Confirm
												message={`Are you sure you want to delete ${event.name}?`}
												onConfirm={() => destroyEvent(
													event.id)}
											/>
											<EditEventDialog
												onClose={() => fetchEvents(
													selectedJournal)}
												eventId={event.id}
											/>
										</CardActions>
									</Card>
								</Grid>
							)
						})}
					</Grid>
			}
		</Page>
	)
}
