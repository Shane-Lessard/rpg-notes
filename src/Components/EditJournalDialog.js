import React, {useEffect, useState} from 'react'
import {
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	makeStyles, TextField,
} from '@material-ui/core'
import {Edit, Save} from '@material-ui/icons'
import JournalService from '../Services/JournalService'

const useStyles = makeStyles(theme => {
	return {
		dialog: {
			width: '800px',
			maxWidth: '100%',
		},
		textField: {
			width: '100%',
		},
	}
})

const journalService = new JournalService()

export default function EditJournalDialog(props){

	const classes = useStyles()

	const [open, setOpen] = useState(false)

	const [name, setName] = useState('')

	const [validation, setValidation] = useState('')

	useEffect(() => {
		(async function() {
			let journal = await journalService.show(props.journalId)
			setName(journal.name)
		})()
	}, [props.journalId])

	async function saveAndClose(){
		try {
			await journalService.update(props.journalId,{
				name: name,
			})
			setOpen(false)
		} catch (e) {
			setValidation('Check that the journal name is unique')
		}
	}
	
	return (
		<div>
			<IconButton onClick={() => setOpen(true)}>
				<Edit color="primary"/>
			</IconButton>
			<Dialog open={open}
					onClose={
						() => {
							setOpen(false)
							saveAndClose()
						}}
			>
				<DialogContent
					className={classes.dialog}
				>
					<Grid container spacing={1}>
						<Grid item xs={3} md={1}>
							<IconButton onClick={saveAndClose}>
								<Save/>
							</IconButton>
						</Grid>
						<Grid item xs={9} md={11}>
							<TextField
								className={classes.textField}
								value={name}
								error={!!validation}
								helperText={validation}
								onChange={
									(e) => {
										setName(e.target.value)
										setValidation('')
									}}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	)
}
