import React, {useState} from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	IconButton,
	Typography,
} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

export default function Confirm(props) {

	const [open, setOpen] = useState(false)

	function answer(confirmed = false) {
		if (confirmed) {
			props.onConfirm()
		}
		setOpen(false)
	}

	return (
		<div>
			{
				props.type === 'button' ?
					<Button onClick={() => setOpen(true)}>
						{props.activator ?? 'Delete'}
					</Button>
					:
					<IconButton onClick={() => setOpen(true)}>
						{props.activator ?? <Delete color="error"/>}
					</IconButton>
			}
			<Dialog open={open} onClose={() => answer(false)}>
				<DialogContent>
					<DialogContentText>
						<Typography>
							{
								props.message ?? 'Are you sure?'
							}
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained"
							onClick={() => answer(true)}>Confirm</Button>
					<Button variant="contained"
							onClick={() => answer(false)}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)

}
