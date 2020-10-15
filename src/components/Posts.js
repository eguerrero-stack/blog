import React, { useState, useEffect} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"
import {Paper, Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button, Grid, withStyles, ButtonGroup} from "@material-ui/core"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

/*
Gamer Blog To Do List

We need to keep the max recent blog posts to like 3 or 4,
Clickable link to view all blogs in a different component
Fix broken images
Move Links to the right side of top navbar or open a side tab


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
    grid:{
        margin:theme.spacing(2),
        padding:theme.spacing(1)
    },
    card:{
      
    }
})


const Posts = ({classes, ...props}) => {
// const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllPosts()},
         []);//Component did mount

    return (
        <Paper elevation={3}>
        <Grid container >
            <Grid className={classes.grid} item xs={8}>
            <Card className="">
      <CardActionArea>
        <CardMedia
          component="img"
        //   alt="Shen"
          height="500"
          image="../images/332687.jpg"
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
            <Grid item xs={3} direction="column" className={classes.root} style={{marginBottom : '5px'}}>
                Top of Card PostsList
                {
                    props.PostsList.map((post, index)=>{
                      if(index < 3){
                        return(
                            <Card key ={index} >
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
                                <ButtonGroup variant="text">
                                  <Button>
                                      <Edit  post={post} color="primary"onClick={() =>{
                                        
                                        // setCurrentId(post.id)
                                        props.history.push({
                                          pathname: `/post/${post.id}`,
                                          ...post

                                        })
                                        }}/>
                                  </Button>
                                  <Button>
                                      <Delete color="danger"/>
                                  </Button>
                                </ButtonGroup>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        )}
                        else
                        {
                          return <div></div>
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
    fetchAllPosts: actions.FetchAll
}


export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Posts));