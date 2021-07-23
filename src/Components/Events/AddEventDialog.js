import React, {useContext, useState} from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@material-ui/core'
import EventService from '../../Services/EventService'
import {SelectedJournalContext} from '../../Contexts/SelectedJournalProvider'

const eventService = new EventService()

export default function AddEventDialog(props) {

	const [name, setName] = useState('')
	const {selectedJournal} = useContext(SelectedJournalContext)

	function cancel() {
		setName('')
		clear()
		props.onClose()
	}

	function submit() {
		eventService.create({
			name: name,
			journal_id: selectedJournal,
		})
		clear()
		props.onClose()
	}

	function clear() {
		setName('')
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>
				Add a Event
			</DialogTitle>
			<DialogContent>
				<TextField
					label="Event Name"
					value={name}
					onChange={(e) => {setName(e.target.value)}}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={submit}>Save</Button>
				<Button variant="contained" onClick={cancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}
