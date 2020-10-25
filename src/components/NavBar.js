import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import {Menu } from "@material-ui/icons"
import { Link} from "react-router-dom";
//import PostsForm from './PostForm';

export default function NavBar() {
    return (
<>
        <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className="" color="inherit" aria-label="menu">
      <Menu/>
    </IconButton>
      <Link to="/">
                    <Button>
                             Home
                     </Button>       
                </Link>
            <Link to="/post">
                <Button>
                        Create Post
                </Button>       
            </Link>
    <Typography variant="h6" className="">
      My Blog  
    </Typography>
            

  </Toolbar>
</AppBar>

</>
    )
}
