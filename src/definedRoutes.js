import React from 'react'
import {
	Explore,
	Info,
	Notes,
	Person,
	ShoppingCart,
	Timer,
	Today,
} from '@material-ui/icons'
import Characters from './Views/Characters'
import Quests from './Views/Quests'
import Places from './Views/Places'
import Events from './Views/Events'
import Journals from './Views/Journals'
import Items from './Views/Items'

const routes = [
	{
		path: '/quests',
		text: 'Quests',
		exact: true,
		icon: <Timer/>,
		component: <Quests/>,
		inNav: true,
	},
	{
		path: '/characters',
		text: 'Characters',
		exact: true,
		icon: <Person/>,
		component: <Characters/>,
		inNav: true,
	},
	{
		path: '/places',
		text: 'Places',
		exact: true,
		icon: <Explore/>,
		component: <Places/>,
		inNav: true,
	},
	{
		path: '/events',
		text: 'Events',
		exact: true,
		icon: <Today/>,
		component: <Events/>,
		inNav: true,
	},
	{
		path: '/items',
		text: 'Items',
		exact: true,
		icon: <ShoppingCart/>,
		component: <Items/>,
		inNav: true,
		divided: true,
	},
	{
		path: '/',
		text: 'Manage Journals',
		exact: true,
		icon: <Notes/>,
		component: <Journals/>,
		inNav: true,
	}
]

export default routes
