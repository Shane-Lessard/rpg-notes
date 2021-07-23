import React, {useContext, useState} from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@material-ui/core'
import ItemService from '../../Services/ItemService'
import {SelectedJournalContext} from '../../Contexts/SelectedJournalProvider'

const itemService = new ItemService()

export default function AddItemDialog(props) {

	const [name, setName] = useState('')
	const {selectedJournal} = useContext(SelectedJournalContext)

	function cancel() {
		setName('')
		clear()
		props.onClose()
	}

	function submit() {
		itemService.create({
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
				Add a Item
			</DialogTitle>
			<DialogContent>
				<TextField
					label="Item Name"
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
