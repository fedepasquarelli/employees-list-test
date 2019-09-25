export default {

    // get the users list
    async getUserList({commit}) {
        // loading on
        commit('SET_LOADING', true)
        await this.$axios({
            url: process.env.apiWpUrl + 'employees',
            method: 'get'
        })
        .then((res) => {
            // set the response in the store
            commit('SET_USERS_LIST', res.data)
            // loading off
            commit('SET_LOADING', false)
        }).catch((err) => {
            commit('SET_ERROR', err);
            commit('SET_LOADING', false)
        })
    }
}