import React, { useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"
import {Paper, Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button, Grid, withStyles, ButtonGroup} from "@material-ui/core"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

/*
Gamer Blog To Do List


Clickable link to view all blogs in a different component
Fix broken images
Move Links to the right side of top navbar or open a side tab
Work on making the Edit and Create forms into the same component
Edit form is only adding the one field that is changed
look into useRef for keeping values in EditForm
*/

const styles = theme => ({
    // the & is a prefix attached to the front of the class name
    root:{
        "& .MuiTypography-h6": {
            fontSize: "1rem",
            lineHeight: 0,
            fontWeight: 300,           
        },
        // "& .Posts-root-1":{
        //   margin: theme.spacing(3),
        // }
    },
    media:{
      height: 500,

    },
    grid:{
        margin:theme.spacing(2),
        padding:theme.spacing(1)
    },
    card:{
      
    }
})


const Posts = ({classes, ...props}) => {
  const [isEditing, setIsEditing] = useState(false);

const postId = useRef(0);

  console.log('props',props)
    useEffect(() => {
        props.fetchAllPosts()
      },
         []);

    return (
        <Paper elevation={3}>
        <Grid container >
            <Grid className={classes.grid} item xs={8}>
            <Card className="">
      <CardActionArea>
        <CardMedia
          component="img"
        //   alt="Shen"
          className={classes.media}
          src="../images/332687.jpg"
          title="League Of Legends"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Subtitle
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
            </Grid>
            <Grid container item xs={3} direction="column" className={classes.root} style={{marginBottom : '5px'}}>
                Recent Blogs
                {
                    props.PostsList.reverse().map((post, index)=>{
                      if(index < 3){
                        console.log(post)
                        return(
                            <Card key ={index}  ref={postId} >
                            <CardActionArea >
                              <CardMedia
                                component="img"
                                height="150"
                                image=""
                                title=""
                              />
                              <CardContent >
                                <Typography gutterBottom variant="h6" component="h6">
                                  {post.title}
                                </Typography>
                                {/* <ButtonGroup variant="text">
                                  <Button> */}
                                    <Link to={{
                                            pathname: `/post/${post.id}`,
                                            postToUpdate : post,
                                            isEditing: true 
                                        }}>
                                      <Edit  color="primary"/>
                                        </Link>
                                  {/* </Button> */}
                                  {/* <Button> */}
                                      <Delete color="error" onClick={()=>{
                                        props.Delete(post.id)
                                      }}/>
                                  {/* </Button> */}
                                {/* </ButtonGroup> */}
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        )}
                        else
                        {
                          return ''
                        }
                       
                    })
                }

            </Grid>
        </Grid>
        </Paper>
    )
}



const mapStateToProps = state =>(
    {
        PostsList: state.posts.list
    }
)

const mapActionToProps = {
    fetchAllPosts: actions.FetchAll,
    Delete: actions.Delete
}


export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Posts));