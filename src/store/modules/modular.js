
const getDefaultState = () => {
const type = {
    1: 'KnowledgeStore',
    2: 'creationPlatform',
    3: 'NewMedia',
    4: 'drainage'
};
  return {
    modular: 1
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  CHANGE_MODULAR: (state, payload) => {
    state.modular = payload;
  }
};

const actions = {
    setModular({ commit }, payload) {
        commit('CHANGE_MODULAR', payload);
    },  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};