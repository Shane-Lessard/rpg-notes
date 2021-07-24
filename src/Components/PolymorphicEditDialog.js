import React, {useEffect, useState} from 'react'
import EditCharacterDialog from './Characters/EditCharacterDialog'
import EditEventDialog from './Events/EditEventDialog'
import EditItemDialog from './Items/EditItemDialog'
import EditPlaceDialog from './Places/EditPlaceDialog'
import EditQuestDialog from './Quests/EditQuestDialog'

export default function PolymorphicEditDialog(props){

	const [component, setComponent] = useState(<span />)

	useEffect(() => {
		switch(props.type){
			case 'characters':
				setComponent(<EditCharacterDialog onClose={() => {}} characterId={props.id} />)
				break
			case 'events':
				setComponent(<EditEventDialog onClose={() => {}} eventId={props.id} />)
				break
			case 'items':
				setComponent(<EditItemDialog onClose={() => {}} itemId={props.id} />)
				break
			case 'places':
				setComponent(<EditPlaceDialog onClose={() => {}} placeId={props.id} />)
				break
			case 'quests':
				setComponent(<EditQuestDialog onClose={() => {}} questId={props.id} />)
				break
			default:
				setComponent(<span />)
		}
	}, [props.type, props.id])

	return component

}
