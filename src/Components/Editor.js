import React from 'react'
import ReactQuill from 'react-quill'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => {
	return {
		root: {
			width: '100%',
		},
	}
})

export default function Editor(props) {

	const classes = useStyles()

	const modules = {
		toolbar: false,
	}

	return (
		<ReactQuill
			className={classes.root}
			value={props.value}
			onChange={props.onChange}
			theme="snow"
			modules={modules}
		/>
	)

}
