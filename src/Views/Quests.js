import React, {useContext, useEffect, useState} from 'react'
import Page from '../Components/Page'
import {SelectedJournalContext} from '../Contexts/SelectedJournalProvider'
import QuestService from '../Services/QuestService'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core'
import {AddOutlined, Done, PriorityHigh} from '@material-ui/icons'
import AddQuestDialog from '../Components/Quests/AddQuestDialog'
import EditQuestDialog from '../Components/Quests/EditQuestDialog'
import Confirm from '../Components/Confirm'
import JournalSelectorDialog from '../Components/JournalSelectorDialog'

const questService = new QuestService()

export default function Quests() {

	const {selectedJournal} = useContext(SelectedJournalContext)

	const [quests, setQuests] = useState([])

	async function fetchQuests(journalId) {
		setQuests(await questService.index(journalId))
	}

	useEffect(() => {
		fetchQuests(selectedJournal)
	}, [selectedJournal])

	const [addQuestDialog, setAddQuestDialog] = useState(false)

	function openAddQuestDialog() {
		setAddQuestDialog(true)
	}

	function closeAddQuestDialog() {
		fetchQuests(selectedJournal)
		setAddQuestDialog(false)
	}

	async function destroyQuest(id) {
		await questService.destroy(id)
		fetchQuests(selectedJournal)
	}

	return (
		<Page>
			<JournalSelectorDialog open={!selectedJournal} />
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h4">
						<AddQuestDialog open={addQuestDialog}
										onClose={() => closeAddQuestDialog()}/>
						<IconButton
							onClick={() => openAddQuestDialog()}>
							<AddOutlined/>
						</IconButton>
						Quests
					</Typography>
				</Grid>
				{quests.map((quest, index) => {
					return (
						<Grid item xs={12} md={6} key={index}>
							<Card className={'fullHeight'}>
								<CardContent>
									<Typography variant="h5"
												className={'wrapIcon'}>
										<Grid container direction="row"
											  alignItems="center">
											{
												quest.complete ?
													<Done
														color="primary"/>
													:
													<PriorityHigh
														color="secondary"/>
											}
											{quest.name}
										</Grid>
									</Typography>
									<Typography
										variant="body2"
										dangerouslySetInnerHTML={{
											__html: quest.notes?.substring(
												0, 300),
										}}
									/>
								</CardContent>
								<div className={'flexGrow'}/>
								<CardActions>
									<Confirm
										message={`Are you sure you want to delete ${quest.name}?`}
										onConfirm={() => destroyQuest(
											quest.id)}
									/>
									<EditQuestDialog
										onClose={() => fetchQuests(
											selectedJournal)}
										questId={quest.id}
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
