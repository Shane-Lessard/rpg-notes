import React from 'react'
import {Dialog, DialogContent} from '@material-ui/core'
import JournalSelector from './JournalSelector'

export default function JournalSelectDialog(props){

	return (
		<Dialog open={props.open}>
			<DialogContent>
				Please Select a Journal
				<JournalSelector/>
			</DialogContent>
		</Dialog>
	)
}
