import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import settings from './modules/settings';
import user from './modules/user';
import modular from './modules/modular';
import VuexPersistence from "vuex-persist";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);
const persist = new VuexPersistence({
    storage: window.sessionStorage,
});

const plugins = [persist.plugin];

// https://vuex.vuejs.org/zh/guide/plugins.html#内置-logger-插件
if (process.env.NODE_ENV === "development") {
  plugins.push(
    createLogger({
      collapsed: true,
      logActions: false, // 记录 action 日志
      logMutations: false, // 记录 mutation 日志
    })
  );
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    modular
  },
  getters,
  plugins
});

export default store;
