import * as actions from './actions';
export function enumeration(state = [], action) {
    switch (action.type) {
        case actions.FETCH_ITEM_LIST:
            return action.payload;
        case actions.UPDATE_ITEM:
            return state.map((item) => {
                if (item.guid == action.payload.guid) {
                    return {
                        ...item,
                        detail:{
                            ...item.detail,
                            ...action.payload
                        }
                    }
                } else {
                    return item;
                }
            })
        case actions.ADD_ITEM:
            return state.concat([action.payload])
        case actions.DELETE_ITEM:
            return state.filter((item) => {
                return item.guid != action.payload.guid;
            })

        case actions.FETCH_ITEM_VALUES:
            return state.map((item) => {
                if (item.guid == action.payload.guid) {
                    return {
                        ...item,
                        detail: action.payload
                    }
                } else {
                    return item;
                }
            })
        case actions.DELETE_ITEM_VALUE:
            var { oldItem, values } = action.payload;
            return state.map((item) => {
                if (item.guid == oldItem.guid) {
                    return {
                        ...item,
                        detail: {
                            ...item.detail,
                            children:  item.detail.children.filter((valueItem)=>{
                                return valueItem.guid != action.payload.values.guid;
                            })
                        }
                    }
                } else {
                    return item;
                }
            })
        case actions.ADD_ITEM_VALUE:
            var { oldItem, values } = action.payload;
            return state.map((item) => {
                if (item.guid == oldItem.guid) {
                    var detail = {
                        ...item.detail,
                        children: item.detail && item.detail.children ? item.detail.children.concat(values) : [values]
                    }
                    return {
                        ...item,
                        detail: detail
                    }
                } else {
                    return item;
                }
            })
        case actions.UPDATE_ITEM_VALUE:
            var { oldItem, values } = action.payload;
            return state.map((item) => {
                if (item.guid == oldItem.guid) {
                    var detail = null;
                    if(item.detail){
                        detail = {
                            ...item.detail,
                            children: item.detail.children.map((oldValues) => {
                                if (oldValues.guid == values.guid) {
                                    return {
                                        ...oldValues,
                                        ...values
                                    };
                                } else {
                                    return oldValues;
                                }
                            })
                        }
                    }else{
                        detail = {
                            children:[values]
                        }
                    }
                    return {
                        ...item,
                        detail: detail
                    }
                } else { 
                    return item;
                }
            })
        default:
            return state;
    }
}