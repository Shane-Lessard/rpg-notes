import React, {useEffect, useState} from 'react'
import {
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	makeStyles,
	TextField,
} from '@material-ui/core'
import PlaceService from '../../Services/PlaceService'
import {Info, Save} from '@material-ui/icons'
import Editor from '../Editor'
import RelationshipList from '../Relationships/RelationshipList'

const placeService = new PlaceService()

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

export default function EditPlaceDialog(props) {

	const classes = useStyles()

	const [content, setContent] = useState('')
	const [name, setName] = useState('')
	const [open, setOpen] = useState(false)

	useEffect(() => {
		(async function() {
			let place = await placeService.show(props.placeId)
			setContent(place.notes)
			setName(place.name)
		})()
	}, [props.placeId])

	function saveAndClose() {
		placeService.update(props.placeId, {
			name: name,
			notes: content,
		})
		props.onClose()
	}

	/*function cancelAndClose(){
		setContent(place.notes)
		setName(place.name)
		props.onClose()
	}*/

	return (
		<div>
			<IconButton onClick={() => setOpen(true)}>
				<Info color="primary"/>
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
						<Grid item xs={9} md={8}>
							<TextField
								className={classes.textField}
								value={name}
								onChange={(e) => setName(e.target.value)}

							/>
						</Grid>
					</Grid>
					<Editor value={content} onChange={setContent}/>
					<Grid container>
						<Grid item>
							<RelationshipList
								type='places'
								id={props.placeId}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	)

}
