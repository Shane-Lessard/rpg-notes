import React, {useContext, useState} from 'react'
import CharacterService from '../../Services/CharacterService'
import EventService from '../../Services/EventService'
import ItemService from '../../Services/ItemService'
import PlaceService from '../../Services/PlaceService'
import QuestService from '../../Services/QuestService'
import {
	Button,
	Dialog, DialogActions, DialogContent,
	Grid,
	IconButton,
	MenuItem,
	Select,
} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import {SelectedJournalContext} from '../../Contexts/SelectedJournalProvider'
import RelationshipService from '../../Services/RelationshipService'

const characterService = new CharacterService()
const eventService = new EventService()
const itemService = new ItemService()
const placeService = new PlaceService()
const questService = new QuestService()
const relationshipService = new RelationshipService()

export default function AddRelationshipDialog(props){

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [open, setOpen] = useState(false)

	const [type, setType] = useState('')
	const [id, setId] = useState(0)

	async function getTypeOptions(value){
		setType(value)
		switch (value){
			case 'characters':
				setOptions(await characterService.index(selectedJournal.id))
				break
			case 'events':
				setOptions(await eventService.index(selectedJournal.id))
				break
			case 'items':
				setOptions(await itemService.index(selectedJournal.id))
				break
			case 'places':
				setOptions(await placeService.index(selectedJournal.id))
				break
			case 'quests':
				setOptions(await questService.index(selectedJournal.id))
				break
			default:
				setOptions([])
		}
	}

	const [options, setOptions] = useState([])

	async function save(){
		console.log(props.type, props.id, type, id)
		await relationshipService.attach(props.type, props.id, type, id)
		props.onClose()
		setOpen(false)
	}

	return (
		<div>
			<IconButton onClick={() => setOpen(true)}>
				<AddOutlined />
			</IconButton>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogContent>
					<DialogActions>
						<Grid container spacing={3}>
							<Grid item>
								<Select
									value={type}
									displayEmpty
									onChange={(e) => {getTypeOptions(e.target.value)}}
								>
									<MenuItem value='' disabled>
										Select a Type
									</MenuItem>
									<MenuItem value='characters'>
										Characters
									</MenuItem>
									<MenuItem value='events'>
										Events
									</MenuItem>
									<MenuItem value='items'>
										Items
									</MenuItem>
									<MenuItem value='places'>
										Places
									</MenuItem>
									<MenuItem value='quests'>
										Quests
									</MenuItem>
								</Select>
							</Grid>
							<Grid item>
								<Select value={id} displayEmpty onChange={
									(e) => {
										setId(e.target.value)
									}}>
									<MenuItem value={0} disabled>
										Select an Option
									</MenuItem>
									{
										options.map((item, index) => {
											return (
												<MenuItem value={item.id} key={index}>
													{item.name}
												</MenuItem>
											)
										})
									}
								</Select>
							</Grid>
							<Grid item>
								<Button variant='contained' onClick={save}>
									Save
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	)

}
