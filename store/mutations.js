export default {
    SET_USERS_LIST(state, payload) {
        state.usersList = payload
    },
    SET_ERROR(state, payload) {
        state.error = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    }
}