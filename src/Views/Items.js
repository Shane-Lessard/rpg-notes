import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import ItemService from '../Services/ItemService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import {AddOutlined} from '@material-ui/icons'
import AddItemDialog from '../Components/Items/AddItemDialog'
import EditItemDialog from '../Components/Items/EditItemDialog'
import Confirm from '../Components/Confirm'
import JournalSelectorDialog from '../Components/JournalSelectorDialog'

const itemService = new ItemService()

export default function Items() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [items, setItems] = useState([])

	async function fetchItems(journalId) {
		setItems(await itemService.index(journalId))
	}

	useEffect(() => {
		fetchItems(selectedJournal)
	}, [selectedJournal])

	const [addItemDialog, setAddItemDialog] = useState(false)

	function openAddItemDialog() {
		setAddItemDialog(true)
	}

	function closeAddItemDialog() {
		fetchItems(selectedJournal)
		setAddItemDialog(false)
	}

	async function destroyItem(id) {
		await itemService.destroy(id)
		fetchItems(selectedJournal)
	}

	return (
		<Page>
		<JournalSelectorDialog open={!selectedJournal} />
		<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h4">
						<AddItemDialog open={addItemDialog}
									   onClose={() => closeAddItemDialog()}/>
						<IconButton
							onClick={() => openAddItemDialog()}>
							<AddOutlined/>
						</IconButton>
						Items
					</Typography>
				</Grid>
				{items.map((item, index) => {
					return (
						<Grid item xs={12} md={6} key={index}>
							<Card className={'fullHeight'}>
								<CardContent>
									<Typography variant="h5">
										{item.name}
									</Typography>
									<Typography
										variant="body2"
										dangerouslySetInnerHTML={{
											__html: item.notes?.substring(
												0, 300),
										}}
									/>
								</CardContent>
								<div className={'flexGrow'}/>
								<CardActions>
									<Confirm
										message={`Are you sure you want to delete ${item.name}?`}
										onConfirm={() => destroyItem(
											item.id)}
									/>
									<EditItemDialog
										onClose={() => fetchItems(
											selectedJournal)}
										itemId={item.id}
									/>
								</CardActions>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		</Page>
	)
}
