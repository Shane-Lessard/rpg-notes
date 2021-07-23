import React, {useContext, useState} from 'react'
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	TextField,
} from '@material-ui/core'
import CharacterService from '../../Services/CharacterService'
import {SelectedJournalContext} from '../../Contexts/SelectedJournalProvider'

const characterService = new CharacterService()

export default function AddCharacterDialog(props) {

	const [name, setName] = useState('')
	const [npc, setNpc] = useState(false)
	const {selectedJournal} = useContext(SelectedJournalContext)

	function cancel() {
		setName('')
		clear()
		props.onClose()
	}

	function submit() {
		characterService.create({
			name: name,
			npc: !!npc,
			journal_id: selectedJournal,
		})
		clear()
		props.onClose()
	}

	function clear() {
		setName('')
		setNpc(false)
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>
				Add a Character
			</DialogTitle>
			<DialogContent>
				<TextField
					label="Character Name"
					value={name}
					onChange={(e) => {setName(e.target.value)}}
				/>

				<FormControl>
					<FormControlLabel
						control={
							<Checkbox
								label="NPC"
								checked={npc}
								onChange={e => {
									setNpc(!!e.target.checked)
								}}
							/>
						}
						label="NPC"
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={submit}>Save</Button>
				<Button variant="contained" onClick={cancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}
