import React from 'react';
import {Grid, TextField} from "@material-ui/core"
const PostsForm = (props) => {
    return (
        <form autoComplete="off" noValidate>
            <Grid container>
            <Grid item xs={12}>
                <TextField 
                name="Title"
                variant="outlined"
                label="Title"
                />
                <TextField 
                name="Subtitle"
                variant="outlined"
                label="Subtitle"
                />
                <TextField 
                name="Description"
                variant="outlined"
                label="Description"
                />
                
                <TextField 
                name="Tags"
                variant="outlined"
                label="Tags"
                />
                <TextField 
                name="Title"
                variant="outlined"
                label="Title"
                hidden
                />
            </Grid>
            </Grid>
        </form>
    )
}
export default PostsForm;
