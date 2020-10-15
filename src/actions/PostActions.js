import api from "./api"


export const ACTION_TYPES = {
   CREATE : 'CREATE',
   UPDATE: 'UPDATE',
   DELETE: 'DELETE',
   FETCH_ALL:'FETCH_ALL',
   FETCH_BY_ID: 'FETCH_BY_ID'
}

// const formatData = data => ({
//     ...data,
    
// })

export const FetchAll = () =>
{
    return dispatch => 
    {
        api.Post().fetchAll()
        .then(
            response =>{
                console.log(response)
                dispatch({
                    type:ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        )
        .catch(err=> console.log(err))
    }
}

export const FetchById = id =>
{
    return dispatch => 
    {
        api.Post().fetchById(id)
        .then(
            response =>{
                console.log('singlepost', response)
                dispatch({
                    type:ACTION_TYPES.FETCH_BY_ID,
                    payload: response.data
                })
            }
        )
        .catch(err=> console.log(err))
    }
}
export const Create = (data, onSuccess) => dispatch => {
api.Post().create(data)
.then(res => {
    dispatch({
        type:ACTION_TYPES.CREATE,
        payload: res.data
    })
    onSuccess();
})
.catch(err=> console.log(err))

}

export const Update = (id, data, onSuccess) => dispatch => {
    api.Post().update(id, data)
    .then(res => {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSuccess();
    })
    .catch(err=> console.log(err))
    
    }

    export const Delete = (id, onSuccess) => dispatch => {
        api.Post().delete(id)
        .then(res => {
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload: id
            })
        onSuccess();

        })
        .catch(err=> console.log(err))
        
        }