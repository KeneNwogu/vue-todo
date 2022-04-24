// store setup

import { createStore } from 'vuex' 
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import actions from './actions'
import mutations from './mutations'

export default createStore({
    state,
    actions,
    mutations,
    plugins: [createPersistedState()]
})