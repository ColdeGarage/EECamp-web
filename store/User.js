const state = () => ({
  _id: null,
  username: '',
  isAdmin: false,
  users: []
});

const getters = {
  isAdmin: (state) => state.isAdmin,
  currentUsername: (state) => state.username,
  currentUserId: (state) => state._id
};

const mutations = {
  SET_LOGIN_STATE(state, currentUser) {
    state._id = currentUser._id;
    state.username = currentUser.email;
    state.isAdmin = currentUser.isAdmin;
  },
  SET_LOGOUT_STATE(state) {
    state._id = null;
    state.username = '';
    state.isAdmin = false;
  }
};

const actions = {
  async login({ commit }, { email, personalID }) {
    const { token } = await this.$api.user.login({ email, personalID });
    this.$cookiz.set('auth_token', token);
    const currentUser = await this.$api.user.getCurrentUser();
    commit('SET_LOGIN_STATE', currentUser);
    return { isAdmin: currentUser.isAdmin };
  },
  logout({ commit }) {
    this.$cookiz.remove('auth_token');
    commit('SET_LOGOUT_STATE');
  }
};

export default { namespaced: true, state, getters, mutations, actions };
