const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('Web/FetchWebData');
    await dispatch('Web/FetchUsersStatus');
    await dispatch('Web/FetchFrontPageImage');
    await dispatch('Web/FetchShirtImage');
    await dispatch('Web/FetchConsent');
  }
};
export default { actions };
