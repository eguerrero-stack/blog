import api from "./api"


export const ACTION_TYPES = {
   CREATE : 'CREATE',
   UPDATE: 'UPDATE',
   DELETE: 'DELETE',
   FETCH_ALL:'FETCH_ALL'
}


export const fetchALL = () =>
{
    return dispatch => 
    {
        api.Post.fetchALL()
        .then(
            response =>{
                dispatch({
                    type:ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        )
        .catch(err=> console.log(err))
    }
}