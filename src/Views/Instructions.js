import React from 'react'
import Page from '../Components/Page'
import {Grid, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles({
	block: {
		display: 'block',
		marginTop: '10px',
	},
})

export default function Instructions() {

	const classes = useStyles()

	return (
		<Page>
			<Grid container>
				<Grid item>
					<Typography className={classes.block} variant="h2">
						This Dumb App for Dummies
					</Typography>
					<Typography className={classes.block} variant="h5">
						Journals
					</Typography>
					<Typography className={classes.block}>
						Journals are a collection of notes. You can have
						multiple journals to keep characters, quests etc
						separated based on campaigns, chapters, or like -
						whatever.
					</Typography>
					<Typography className={classes.block}>
						You will need to select a journal before making or
						viewing any notes.
					</Typography>
					<Typography className={classes.block} variant="h5">
						Quests, Items, Characters, Locations, Events
					</Typography>
					<Typography className={classes.block}>
						These are just categories of notes. There's not much
						difference. Characters let's you flag between NPCs or
						PCs, and Quests have a completion flag. Otherwise,
						they're all the same.
					</Typography>
					<Typography className={classes.block} variant="h5">
						Roadmap
					</Typography>
					<Typography className={classes.block}>
						I might make some tweaks. Like a relationship between
						characters and items (in-inventory reference to a
						character). I also might add the ability to link to
						other notes from within the editor. But this is probably
						the end.
					</Typography>
					<Typography className={classes.block} variant="h5">
						Data
					</Typography>
					<Typography className={classes.block}>
						This is a completely serverless application. ALL data is
						stored within your browser. That means that clearing
						your app data may (will) delete your journal. I MAY
						create a save/open function to maintain specific
						journals - but I wouldn't count on it.
					</Typography>
				</Grid>
			</Grid>
		</Page>
	)
}
