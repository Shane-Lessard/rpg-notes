import React from 'react'
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from '@material-ui/core'
import {Link, useLocation} from 'react-router-dom'
import routes from './../definedRoutes'
import {Casino} from '@material-ui/icons'

const useStyles = makeStyles({
	list: {
		maxWidth: '100%',
		width: 350,
	},
	fullList: {
		width: '100%',
	},
	flex: {
		display: 'flex',
	},
})

export default function NavDrawer(props) {

	const classes = useStyles()
	const location = useLocation()

	return (
		<Drawer
			variant="temporary"
			open={props.open}
			anchor={'left'}
			onClose={props.onClose}
		>
			<List component="nav" className={classes.list}>
				{
					routes.map((route, index) => {

						if (route.inNav) {
							return (
								<div key={index}>
									<ListItem
										component={Link}
										button
										to={route.path}
										className={classes.fullList}
										selected={route.path ===
										location.pathname}
									>
										<ListItemIcon>
											{route.icon ?? <Casino/>}
										</ListItemIcon>
										<ListItemText primary={route.text}/>
									</ListItem>
									{
										route.divided ? <Divider/> : ''
									}
								</div>
							)
						}

						return <div></div>

					})
				}
			</List>
		</Drawer>
	)
}
