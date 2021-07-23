import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import CharacterService from '../Services/CharacterService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import AddCharacterDialog from '../Components/Characters/AddCharacterDialog'
import EditCharacterDialog from '../Components/Characters/EditCharacterDialog'
import Confirm from '../Components/Confirm'
import JournalSelector from '../Components/JournalSelector'

const characterService = new CharacterService()

export default function Characters() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [characters, setCharacters] = useState([])

	async function fetchCharacters(journalId) {
		setCharacters(await characterService.index(journalId))
	}

	useEffect(() => {
		fetchCharacters(selectedJournal)
	}, [selectedJournal])

	const [addCharacterDialog, setAddCharacterDialog] = useState(false)

	function openAddCharacterDialog() {
		setAddCharacterDialog(true)
	}

	function closeAddCharacterDialog() {
		fetchCharacters(selectedJournal)
		setAddCharacterDialog(false)
	}

	async function destroyCharacter(id) {
		await characterService.destroy(id)
		fetchCharacters(selectedJournal)
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
								<AddCharacterDialog open={addCharacterDialog}
													onClose={() => closeAddCharacterDialog()}/>
								<IconButton
									onClick={() => openAddCharacterDialog()}>
									<AddOutlined/>
								</IconButton>
								Characters
							</Typography>
						</Grid>
						{characters.map((character, index) => {
							return (
								<Grid item xs={12} md={6} key={index}>
									<Card className={'fullHeight'}>
										<CardContent>
											<Typography variant="h5">
												{character.name}
											</Typography>
											<Typography variant="body2">
												{character.npc ? 'NPC' : 'PC'}
											</Typography>
											<Typography
												variant="body2"
												dangerouslySetInnerHTML={{
													__html: character.notes?.substring(
														0, 300),
												}}
											/>
										</CardContent>
										<div className={'flexGrow'}/>
										<CardActions>
											<Confirm
												message={`Are you sure you want to delete ${character.name}?`}
												onConfirm={() => destroyCharacter(
													character.id)}
											/>
											<EditCharacterDialog
												onClose={() => fetchCharacters(
													selectedJournal)}
												characterId={character.id}
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
