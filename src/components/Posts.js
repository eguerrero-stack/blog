import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/PostActions"



const Posts = (props) => {
    return (
        <div>
            from Posts
        </div>
    )
}

useEffect((props) => {
    props.fetchAllPosts()},
     [])


const mapStateToProps = state =>{
    return{
        PostsList: state.posts.list
    }
}

const mapActionToProps = {
    fetchAllPosts: actions.fetchALL
}


export default connect(mapStateToProps, mapActionToProps) (Posts);