import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // 用户登录
  login({ commit }, payload) {
    return new Promise(async(resolve, reject) => {
      try {
        let { data } = await login(payload);
        commit('SET_TOKEN', data.access_token);
        setToken(data.access_token);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data, code } = response;
        if (code) {
          return reject('登录账号角色不对');
        } else {
          const { customerID } = data;
          commit('SET_NAME', customerID);
          resolve(response);
        }
        
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_NAME', null);
        removeToken(); 
        resetRouter();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};