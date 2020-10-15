import React, {useEffect} from 'react';
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


const initialFieldValues = {
    Title: '',
    Subtitle: '',
    Description:'',
    Tags:''
    
}


const EditForm = ({classes,...props}) => {
console.log('Edit props', props)
// useEffect(() => {
//     if(props.id !== 0)
//     setValues({
//         ...props.PostsList.find(x => x.id === props.id)
//     })
// }, [props.id])
useEffect(() => {
   let editPost = props.getPost(props.match.params.id)
   console.log('This is the post',editPost)
//    let post = editPost.data;
//    initialFieldValues = {
//        Title : post.title,
//        Subtitle : post.subtitle,
//        Description : post.description,
//        Tags : post.tags
//    }
}, [])

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

    console.log('isvalidated',isValidated)
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
            props.createPost(values, () =>{window.alert('inserted')})
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


const mapStateToProps = (state, ownProps) =>(
    {
        PostsList: state.posts.list,
        PostId : ownProps.match.params.currentId
    }
)

const mapActionToProps = {
    createPost: actions.Create,
    updatePost: actions.Update,
    getPost : actions.FetchById
}




export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditForm));
