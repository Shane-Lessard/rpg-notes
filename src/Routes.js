import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from './definedRoutes'

export default function Routes() {

	return (
		<Switch>
			{
				routes.map(route => {
					return (
						<Route key={route.text} path={route.path}
							   exact={route.exact}>
							{route.component}
						</Route>
					)
				})
			}
		</Switch>
	)
}
