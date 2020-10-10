import React, { useState, useEffect} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"

/*

PostForm may not go side by side with the blog posts. 
I believe a seperate form page and a home blog tile page with a top navbar would be perfect.

*/

const Posts = props => {

    useEffect(() => {
        props.fetchAllPosts()},
         []);//Component did mount
    return (
        <div>
            from Posts
        </div>
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


export default connect(mapStateToProps, mapActionToProps) (Posts);