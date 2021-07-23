import {
	AppBar,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core'
import {MenuTwoTone} from '@material-ui/icons'
import React from 'react'
import JournalSelector from './JournalSelector'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	selectRoot: {
		color: 'white',
	},
}))

export default function TopBar(props) {

	const classes = useStyles()

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton color="inherit" className={classes.menuButton}
							edge="start" onClick={() => {props.onMenuClick()}}>
					<MenuTwoTone/>
				</IconButton>
				<Typography className={classes.grow}>
					RP Notes
				</Typography>
				<JournalSelector/>
			</Toolbar>
		</AppBar>
	)
}
