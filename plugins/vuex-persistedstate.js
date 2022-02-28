import createPersistedState from 'vuex-persistedstate';

export default ({ store, req, app }) => {
  createPersistedState({
    storage: {
      getItem: (key) => {
        return app.$cookiz.get(key);
      },
      setItem: (key, value) =>
        app.$cookiz.set(key, value, {
          maxAge: 60 * 60 * 24 * 365,
          secure: true
        }),
      removeItem: (key) => app.$cookiz.remove(key)
    }
  })(store);
};
