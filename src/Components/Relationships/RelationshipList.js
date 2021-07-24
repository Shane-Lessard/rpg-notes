import React, {useEffect, useState} from 'react'
import RelationshipService from '../../Services/RelationshipService'
import {
	Grid,
	List,
	ListItem, ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core'
import {
	Explore,
	Person,
	ShoppingCart, Timer,
	Today,
} from '@material-ui/icons'
import AddRelationshipDialog from './AddRelationshipDialog'
import Confirm from '../Confirm'
import PolymorphicEditDialog from '../PolymorphicEditDialog'

const relationshipService = new RelationshipService()

export default function RelationshipList(props){

	const [relationships, setRelationships] = useState([])

	async function fetchRelationships(){
		setRelationships(await relationshipService.list(props.type, props.id))
	}

	async function deleteRelationship(type, id, joinType, joinId){
		//Should this be in the service?
		relationshipService.detach(type, id, joinType, joinId)
		relationshipService.detach(joinType, joinId, type, id)
		fetchRelationships()
	}

	const icons = {
		characters: <Person />,
		events: <Today />,
		items: <ShoppingCart />,
		places: <Explore />,
		quests: <Timer />
	}

	useEffect(() => {
		fetchRelationships()
		// eslint-disable-next-line
	}, [])

	return (
		<Grid container>
			<Grid item>
				<Typography variant='body2'>
					<Grid container alignItems='center'>
						<Grid item>
							<AddRelationshipDialog
								onClose={fetchRelationships}
								type={props.type}
								id={props.id}
							/>
						</Grid>
						<Grid item>
							Related
						</Grid>
					</Grid>
				</Typography>
				<List>
					{
						relationships.map((item, index) => {
							return (
								<ListItem key={index}>
									<Grid container alignItems={'center'}>
										<Grid item>
											<ListItemIcon>
												{icons[item.type]}
											</ListItemIcon>
										</Grid>
										<Grid item className={'flexGrow'}>
											<ListItemText primary={item.content.name} />
										</Grid>
										<Grid item>
											<ListItemIcon>
												<PolymorphicEditDialog type={item.type} id={item.content.id} />
											</ListItemIcon>
										</Grid>
										<Grid item>
											<ListItemIcon>
												<Confirm onConfirm={() => {deleteRelationship(props.type, props.id, item.type, item.content.id)}} />
											</ListItemIcon>
										</Grid>
									</Grid>
								</ListItem>
							)
						})
					}
				</List>
			</Grid>
		</Grid>
	)

}
