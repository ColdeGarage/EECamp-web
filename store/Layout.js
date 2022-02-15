const state = () => ({
  isDrawerOpen: false
});

const getters = {
  GetIsDrawerOpen: (state) => state.isDrawerOpen
};

const mutations = {
  SetIsDrawerOpen(state, isOpen) {
    state.isDrawerOpen = isOpen;
  }
};

export default { namespaced: true, state, getters, mutations };
