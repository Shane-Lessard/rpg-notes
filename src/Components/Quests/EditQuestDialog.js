import React, {useEffect, useState} from 'react'
import {
	Checkbox,
	Dialog,
	DialogContent,
	FormControlLabel,
	Grid,
	IconButton,
	makeStyles,
	TextField,
} from '@material-ui/core'
import QuestService from '../../Services/QuestService'
import {Info, Save} from '@material-ui/icons'
import Editor from '../Editor'
import RelationshipList from '../Relationships/RelationshipList'

const questService = new QuestService()

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

export default function EditQuestDialog(props) {

	const classes = useStyles()

	const [content, setContent] = useState('')
	const [name, setName] = useState('')
	const [open, setOpen] = useState(false)
	const [complete, setComplete] = useState(false)

	useEffect(() => {
		(async function() {
			let quest = await questService.show(props.questId)
			setContent(quest.notes)
			setName(quest.name)
			setComplete(quest.complete)
		})()
	}, [props.questId])

	function saveAndClose() {
		questService.update(props.questId, {
			name: name,
			notes: content,
			complete: complete,
		})
		props.onClose()
	}

	/*function cancelAndClose(){
		setContent(quest.notes)
		setName(quest.name)
		setComplete(quest.complete)
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
						<Grid item xs={12} md={3}>
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
						</Grid>
					</Grid>
					<Editor value={content} onChange={setContent}/>
					<Grid container>
						<Grid item>
							<RelationshipList
								type='quests'
								id={props.questId}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	)

}
