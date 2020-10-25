import React, {useEffect, useState} from 'react';
import {Grid, TextField, withStyles,FormControl, InputLabel, Select, Button,Paper, MenuItem, FormHelperText} from "@material-ui/core"
import useForm from './useForm'
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"



const styles = theme =>({
    // root:{
    //     '& .MuiTextField-root':{
    //         margin: theme.spacing(1),
    //         minWidth:200
    //     }

    // },
    formControl:{
        margin: theme.spacing(2),
        minWidth: 230
    },
    paper:{
        minHeight: window.innerHeight - 100
    },
    margin:{
        margin: theme.spacing(2),

    }
})


//The initial field values need to be empty fields or the post that is being updated before being passed into the useForm hook
// currently we have access to isEditing to toggle between the updated post values and empty strings for creating a new post
// the initial field values currently are undefined


const EditForm = ({classes,...props}) => {
console.log('props',props)
const postId = props.match.params.id;
const isEditing = props.location.isEditing
const postToUpdate = props.location.postToUpdate

useEffect(() => {

   updateFieldValues();
    
}, [])

let initialFieldValues = {
    Title: '',
    Subtitle: '',
    Description:'',
    Tags:''
}


const updateFieldValues = () => {
    if(isEditing){
         initialFieldValues = {
            Title: postToUpdate.Title,
            Subtitle: postToUpdate.Subtitle,
            Description:postToUpdate.Description,
            Tags:postToUpdate.Tags
        }
        console.log('These are my initial field values',initialFieldValues)
    }
     
}


//Instead of checking for a value maybe check if the value is not the same as it was before or add two checks?
const validate = (fieldValues = values) => {
    let temp = {};
    if('Title' in fieldValues)
    temp.Title = fieldValues.Title ? "" : "This field is required"
    if('Description' in fieldValues)
    temp.Description = fieldValues.Description ? "" : "This field is required"
    if('Tags' in fieldValues)
    temp.Tags = fieldValues.Tags ? "" : "This field is required"
    // temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : This field is not valid this is how to validate email in regular expression
    setErrors({
        ...temp,
    })

if(fieldValues === values){
    let isValidated = Object.values(temp).every( x => x === "")
    return isValidated;
}
    
}

const {
    values,
    setValues,
    handleInputChange,
    inputLabel,
    labelWidth,
    setLabelWidth,
    errors, 
    setErrors

} = useForm(initialFieldValues, validate)

    const handleSubmit = e => {
        e.preventDefault();

        if(validate()){
            props.updatePost(postId, values, () =>{window.alert('updated')})
        }
    }



    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Paper className={classes.paper} elevation={3}>
            <Grid container>
            <Grid container item xs={12}>
                     <>
                    <Grid item xs={6} className={classes.margin}>
                        <TextField 
                            name="Title"
                            variant="outlined"
                            label="Title"
                            value={values.Title}
                            onChange={handleInputChange}
                            fullWidth
                            {...(errors.Title && {error: true, helperText: errors.Title})}
                        />
                    </Grid>
                        <Grid item xs={5} className={classes.margin}>

                            <TextField 
                                 name="Subtitle"
                                 variant="outlined"
                                 label="Subtitle"
                                 value={values.Subtitle}
                                 onChange={handleInputChange}
                            fullWidth
                            />
                        </Grid>
                    </>
            </Grid>
                
                <FormControl variant="outlined" className={classes.formControl} {...(errors.Tags && {error: true})}>
                    <InputLabel ref={inputLabel}>Games</InputLabel>
                    <Select
                    name="Tags"
                    value={values.Tags}
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                    

                    >
                     <MenuItem value ="">Select Game</MenuItem>   
                    <MenuItem value ="Apex Legends">Apex Legends</MenuItem>
                    <MenuItem value ="Phasmophobia">Phasmophobia</MenuItem>
                    <MenuItem value ="Among Us">Among Us</MenuItem>
                    <MenuItem value ="Spellbreak">Spellbreak</MenuItem>
                    <MenuItem value ="Stick Fight: The Game">Stick Fight: The Game</MenuItem>
                    </Select>
                    {errors.Tags && <FormHelperText>{errors.Tags}</FormHelperText>}
                </FormControl>
                <Grid item xs={12} className={classes.margin} >

                <TextField 
                name="Description"
                variant="outlined"
                label="Description"
                value={values.Description}
                onChange={handleInputChange}
                multiline
                rows={8}
                rowsMax={12}
                fullWidth
                {...(errors.Description && {error: true, helperText: errors.Description})}

                />

            </Grid>
            <div>
                <Button variant="contained" className={classes.margin}>             
                    Reset
                </Button>
                
                
                <Button 
                variant="contained"
                color="primary"
                type="submit"
                className={classes.margin}
                >
                    Submit
                </Button>
            </div>
            </Grid>
            </Paper>
        </form>
    )
}


const mapStateToProps = (state) =>(
    {
        post: state.posts.singlePost,
        
    }
)

const mapActionToProps = {
    updatePost: actions.Update,
    getPost : actions.FetchById
}




export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditForm));
