import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    votingCards: []
  },
  plugins: [createPersistedState()],
  getters: {
    getCardsStatus: (state) => {
      return state.votingCards
    }
  },
  mutations: {
    saveCardVotes (state, {
      id,
      thumb_up,
      thumb_down,
      votesNumber
    }) {
      state.votingCards[id] = {
        id: id,
        thumb_up: thumb_up,
        thumb_down: thumb_down,
        votesNumber: votesNumber
      };
    }
  },
  actions: {
    saveCardVotesAction({
      commit
    }, votingCard) {
      commit('saveCardVotes', votingCard)
    }
  },
  modules: {}
})
