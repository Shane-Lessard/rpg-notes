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
import QuestService from '../../Services/QuestService'
import {SelectedJournalContext} from '../../Contexts/SelectedJournalProvider'

const questService = new QuestService()

export default function AddQuestDialog(props) {

	const [name, setName] = useState('')
	const [complete, setComplete] = useState(false)
	const {selectedJournal} = useContext(SelectedJournalContext)

	function cancel() {
		setName('')
		clear()
		props.onClose()
	}

	function submit() {
		questService.create({
			name: name,
			complete: !!complete,
			journal_id: selectedJournal,
		})
		clear()
		props.onClose()
	}

	function clear() {
		setName('')
		setComplete(false)
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>
				Add a Quest
			</DialogTitle>
			<DialogContent>
				<TextField
					label="Quest Name"
					value={name}
					onChange={(e) => {setName(e.target.value)}}
				/>

				<FormControl>
					<FormControlLabel
						control={
							<Checkbox
								label="Complete"
								checked={complete}
								onChange={e => {
									setComplete(!!e.target.checked)
								}}
							/>
						}
						label="Complete"
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
