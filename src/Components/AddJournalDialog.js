import React, {useState} from 'react'
import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	InputLabel,
	TextField,
} from '@material-ui/core'
import JournalService from '../Services/JournalService'

const journalService = new JournalService()

export default function AddJournalDialog(props) {

	const [name, setName] = useState('')
	const [validation, setValidation] = useState('')

	async function handleSubmit(e) {

		e.preventDefault()

		try {
			await journalService.create({
				name: name,
			})
			setName('')
			props.onClose(true)
		} catch (e) {
			setValidation('Check that the journal name is unique')
		}

	}

	function handleClose() {
		setName('')
		props.onClose()
	}

	//TODO change to Dialog for consistency
	return (
		<Dialog open={props.open} onClose={handleClose}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={4} p={5} m={5} alignItems="center">
						<Grid item xs={12} sm={8}>
							<InputLabel id="journal-name-input-label">Create
								Journal</InputLabel>
							<TextField
								value={name}
								error={!!validation}
								helperText={validation}
								onChange={
									(e) => {
										setName(e.target.value)
										setValidation('')
									}
								}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Button color="primary" variant="contained"
									type="submit">Save</Button>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	)

}
