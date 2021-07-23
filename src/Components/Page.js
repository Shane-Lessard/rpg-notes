import React from 'react'
import {Box, Grid} from '@material-ui/core'

export default function Page(props) {

	return (
		<Box p={5} pt={5} mt={3}>
			<Grid container>
				{props.children}
			</Grid>
		</Box>
	)

}
