import React, {useState} from 'react'
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'
import TopBar from './Components/TopBar'
import NavDrawer from './Components/NavDrawer'
import {
	Container,
	createTheme,
	Grid,
	MuiThemeProvider,
	Paper,
	useMediaQuery,
} from '@material-ui/core'
import './App.css'
import 'react-quill/dist/quill.snow.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import State from './State'

function App() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	)

	const [nav, toggleNav] = useState(false)

	return (
		<div className="App">
			<MuiThemeProvider theme={theme}>
				<CssBaseline/>
				<State>
					<BrowserRouter basename={process.env.PUBLIC_URL}>
						<NavDrawer open={nav}
								   onClose={() => {toggleNav(false)}}/>
						<TopBar onMenuClick={() => {toggleNav(true)}}/>
						<Container>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Paper>
										<Routes/>
									</Paper>
								</Grid>
							</Grid>
						</Container>
					</BrowserRouter>
				</State>
			</MuiThemeProvider>
		</div>
	)
}

export default App
