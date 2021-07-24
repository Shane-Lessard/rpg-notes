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
import CharacterService from '../../Services/CharacterService'
import {Info, Save} from '@material-ui/icons'
import Editor from '../Editor'
import RelationshipList from '../Relationships/RelationshipList'

const characterService = new CharacterService()

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

export default function EditCharacterDialog(props) {

	const classes = useStyles()

	const [content, setContent] = useState('')
	const [name, setName] = useState('')
	const [open, setOpen] = useState(false)
	const [npc, setNpc] = useState(false)

	useEffect(() => {
		(async function() {
			let character = await characterService.show(props.characterId)
			setContent(character.notes)
			setName(character.name)
			setNpc(character.npc)
		})()
	}, [props.characterId])

	function saveAndClose() {
		characterService.update(props.characterId, {
			name: name,
			notes: content,
			npc: npc,
		})
		props.onClose()
	}

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
										label="NPC"
										checked={npc}
										onChange={e => {
											setNpc(!!e.target.checked)
										}}
									/>
								}
								label="NPC"
							/>
						</Grid>
					</Grid>
					<Editor value={content} onChange={setContent}/>
					<Grid container>
						<Grid item>
							<RelationshipList
								type='characters'
								id={props.characterId}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	)

}
