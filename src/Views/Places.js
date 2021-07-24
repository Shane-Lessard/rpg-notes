import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import PlaceService from '../Services/PlaceService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import AddPlaceDialog from '../Components/Places/AddPlaceDialog'
import EditPlaceDialog from '../Components/Places/EditPlaceDialog'
import Confirm from '../Components/Confirm'
import JournalSelector from '../Components/JournalSelector'

const placeService = new PlaceService()

export default function Places() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [places, setPlaces] = useState([])

	async function fetchPlaces(journalId) {
		setPlaces(await placeService.index(journalId))
	}

	useEffect(() => {
		fetchPlaces(selectedJournal)
	}, [selectedJournal])

	const [addPlaceDialog, setAddPlaceDialog] = useState(false)

	function openAddPlaceDialog() {
		setAddPlaceDialog(true)
	}

	function closeAddPlaceDialog() {
		fetchPlaces(selectedJournal)
		setAddPlaceDialog(false)
	}

	async function destroyPlace(id) {
		await placeService.destroy(id)
		fetchPlaces(selectedJournal)
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
								<AddPlaceDialog open={addPlaceDialog}
												onClose={() => closeAddPlaceDialog()}/>
								<IconButton
									onClick={() => openAddPlaceDialog()}>
									<AddOutlined/>
								</IconButton>
								Places
							</Typography>
						</Grid>
						{places.map((place, index) => {
							return (
								<Grid item xs={12} md={6} key={index}>
									<Card className={'fullHeight'}>
										<CardContent>
											<Typography variant="h5">
												{place.name}
											</Typography>
											<Typography
												variant="body2"
												dangerouslySetInnerHTML={{
													__html: place.notes?.substring(
														0, 300),
												}}
											/>
										</CardContent>
										<div className={'flexGrow'}/>
										<CardActions>
											<Confirm
												message={`Are you sure you want to delete ${place.name}?`}
												onConfirm={() => destroyPlace(
													place.id)}
											/>
											<EditPlaceDialog
												onClose={() => fetchPlaces(
													selectedJournal)}
												placeId={place.id}
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
