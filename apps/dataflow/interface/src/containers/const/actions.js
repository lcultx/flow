import * as api from '../../api';

const ModuleActionNameSpace = 'CONST';

export const FETCH_ITEM_LIST = `FETCH_${ModuleActionNameSpace}_ITEM_LIST`;
export const UPDATE_ITEM = `UPDATE_${ModuleActionNameSpace}_ITEM`;
export const ADD_ITEM = `ADD_${ModuleActionNameSpace}_ITEM`;
export const DELETE_ITEM = `DELETE_${ModuleActionNameSpace}_ITEM`;


export const FETCH_ITEM_VALUES = `FETCH_${ModuleActionNameSpace}_ITEM_VALUES`;
export const UPDATE_ITEM_VALUE = `UPDATE_${ModuleActionNameSpace}_ITEM_VALUE`;
export const ADD_ITEM_VALUE = `ADD_${ModuleActionNameSpace}_ITEM_VALUE`;
export const DELETE_ITEM_VALUE = `DELETE_${ModuleActionNameSpace}_ITEM_VALUE`;



export const fetchItemList = ()=>(dispatch, getState)=>{
    api.request({
        url:api.CONST_REST_API,
    }).then((res)=>{
        dispatch({
            type:FETCH_ITEM_LIST,
            payload:res.data.content
        })
    })
}

export const editItem = (data)=> (dispatch,getState) =>{
    var {guid,...dataValues} = data;
    api.request({
        url:api.CONST_REST_API + '/' + data.guid,
        method:'PUT',
        data:dataValues
    }).then((res)=>{
        dispatch({
            type:UPDATE_ITEM,
            payload:data
        })
    })
} 

export const addItem = (data)=>(dispatch,getState)=>{
    api.request({
        url:api.CONST_REST_API,
        method:'POST',
        data:{
            ...data,
            _class:'constant'   
        }
    }).then((res)=>{
        dispatch({
            type:ADD_ITEM,
            payload:res.data.content
        })
    })
}

export const deleteItem = (data) => (dispatch,getState) =>{
    api.request({
        url:api.CONST_REST_API + '/' + data.guid,
        method:'DELETE'
    }).then((res)=>{
        dispatch({
            type:DELETE_ITEM,
            payload:data
        })
    })
}

export const fetchItemValues = (guid)=>(dispatch, getState)=>{
    api.request({
        url:api.CONST_REST_API + '/' + guid,
    }).then((res)=>{
        dispatch({
            type:FETCH_ITEM_VALUES,
            payload:res.data.content
        })
    })
}

export const editItemValue = (item,values) => (dispatch,getState) =>{
    var {guid,...dataValues} = values;
    api.request({
        url:api.CONST_REST_API + '/' + item.guid + '/' + guid,
        data:dataValues,
        method: 'PUT',
    }).then((res)=>{
        dispatch({
            type:UPDATE_ITEM_VALUE,
            payload:{
                oldItem:item,
                values
            }
        })
    })
}

export const addItemValue = (item,values)=>(dispatch,getState)=>{
    var {guid,...dataValues} = values;
    api.request({
        url:api.CONST_REST_API + '/' + item.guid ,
        data:{
            ...dataValues,
            _class:'constant.item'   
        },
        method: 'POST',
    }).then((res)=>{
        dispatch({
            type:ADD_ITEM_VALUE,
            payload:{
                oldItem:item,
                values:res.data.content
            }
        })
    })
}

export const deleteItemValue = (item,values)=>(dispatch,getState)=>{
    var {guid,...dataValues} = values;
    api.request({
        url:api.CONST_REST_API + '/' + item.guid + '/' + guid,
        method: 'DELETE',
    }).then((res)=>{
        dispatch({
            type:DELETE_ITEM_VALUE,
            payload:{
                oldItem:item,
                values
            }
        })
    })
}