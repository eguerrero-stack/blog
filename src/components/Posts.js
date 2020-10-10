import React, { useState, useEffect} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"
import {Paper, Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button, Grid, withStyles} from "@material-ui/core"

/*

PostForm may not go side by side with the blog posts. 
I believe a seperate form page and a home blog tile page with a top navbar would be perfect.
I believe these components may be separated better

*/

const styles = theme => ({
    // the & is a prefix attached to the front of the class name
    root:{
        "& .MuiTypography-h6": {
            fontSize: "1rem",
            lineHeight: 0,
            fontWeight: 300

        }
    },
    grid:{
        margin:theme.spacing(2),
        padding:theme.spacing(1)
    }
    
})

const Posts = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllPosts()},
         []);//Component did mount

    return (
        <Paper elevation={3}>
        <Grid container>
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
            <Grid item xs={3}>
                Top of Card PostsList
                {
                    props.PostsList.map((post, index)=>{
                        return(
                            <Card key ={index} className={classes.root}>
                            <CardActionArea >
                              <CardMedia
                                component="img"
                                height="150"
                                image="../images/332687.jpg"
                                title="League Of Legends"
                              />
                              <CardContent >
                                <Typography gutterBottom variant="h6" component="h6">
                                  {post.title}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        )
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
    fetchAllPosts: actions.fetchAll
}


export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Posts));