import store from './store'

export function dispatch(type, payload) {

    store.dispatch({
        type: type,
        payload: payload
    });
}
