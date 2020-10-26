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

// Main problem here is that page refreshes after typing and nothing is being added to edit form
// if receiving props then change state to keep form values?

const EditForm = ({classes,...props}) => {
console.log('props',props)
const postId = props.match.params.id;
const isEditing = props.location.isEditing
const postToUpdate = props.post 

const initialFieldValues = {
    title: '',
    subtitle: '',
    description:'',
    tags:''
}


useEffect(() => {
console.log(isEditing)
    if(isEditing){
    props.getPost(postId)
    console.log('grabbing post')
    }

    console.log('post to update', postToUpdate)

    if(postToUpdate){
        updateFieldValues(postToUpdate)
    }else{
        console.log('creating new post');
    }
       
}, [])




const updateFieldValues = (post) => {  
         setValues(post)
        console.log('setField Values')  
}


//Instead of checking for a value maybe check if the value is not the same as it was before or add two checks?
const validate = (fieldValues = values) => {
    let temp = {};
    if('Title' in fieldValues)
    temp.title = fieldValues.title ? "" : "This field is required"
    if('Description' in fieldValues)
    temp.description = fieldValues.description ? "" : "This field is required"
    if('Tags' in fieldValues)
    temp.tags = fieldValues.tags ? "" : "This field is required"
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
            if(isEditing){

                props.updatePost(postId, values, () =>{window.alert('updated')})
            }
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
                            value={values.title}
                            onChange={handleInputChange}
                            fullWidth
                            {...(errors.title && {error: true, helperText: errors.title})}
                        />
                    </Grid>
                        <Grid item xs={5} className={classes.margin}>

                            <TextField 
                                 name="Subtitle"
                                 variant="outlined"
                                 label="Subtitle"
                                 value={values.subtitle}
                                 onChange={handleInputChange}
                            fullWidth
                            />
                        </Grid>
                    </>
            </Grid>
                
                <FormControl variant="outlined" className={classes.formControl} {...(errors.tags && {error: true})}>
                    <InputLabel ref={inputLabel}>Games</InputLabel>
                    <Select
                    name="Tags"
                    value={values.tags}
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
                    {errors.tags && <FormHelperText>{errors.tags}</FormHelperText>}
                </FormControl>
                <Grid item xs={12} className={classes.margin} >

                <TextField 
                name="Description"
                variant="outlined"
                label="Description"
                value={values.description}
                onChange={handleInputChange}
                multiline
                rows={8}
                rowsMax={12}
                fullWidth
                {...(errors.description && {error: true, helperText: errors.description})}

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
