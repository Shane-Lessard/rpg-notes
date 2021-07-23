import React, {useContext, useEffect, useState} from 'react'
import {
	FormControl,
	IconButton,
	makeStyles,
	MenuItem,
	Select,
} from '@material-ui/core'
import {Add} from '@material-ui/icons'
import AddJournalDialog from './AddJournalDialog'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import {JournalListContext} from '../Contexts/JournalListProvider'

const useStyles = makeStyles((theme) => ({

	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	selectRoot: {
		color: 'white',
		flexGrow: 1,
	},
}))

export default function JournalSelector() {

	const classes = useStyles()

	const {selectedJournal, setSelectedJournal} = useContext(
		SelectedJournalContext)

	const {journalList, fetchJournalList} = useContext(JournalListContext)

	async function fetchJournals() {
		fetchJournalList()
	}

	useEffect(() => {
		fetchJournalList()
		// eslint-disable-next-line
	}, [])

	const [addJournalDialog, setAddJournalDialog] = useState(false)

	function openAddJournalDialog() {
		setAddJournalDialog(true)
	}

	function closeAddJournalDialog(resync = false) {
		setAddJournalDialog(false)
		if (resync) {
			fetchJournals()
		}
	}

	return (
		<div>
			<FormControl className={classes.selectRoot}>
				<Select
					className={classes.selectRoot}
					value={selectedJournal}
					//displayEmpty
					onChange={(e) => {setSelectedJournal(e.target.value)}}>
					<MenuItem disabled value={0}>Select a Journal</MenuItem>
					{
						journalList.map((journal, i) => {
							return <MenuItem key={i}
											 value={journal.id}>{journal.name}</MenuItem>
						})
					}
				</Select>
			</FormControl>
			<IconButton className={classes.grow} color="inherit"
						onClick={openAddJournalDialog}>
				<Add/>
			</IconButton>
			<AddJournalDialog
				open={addJournalDialog}
				onClose={closeAddJournalDialog}
			/>
		</div>
	)

}
