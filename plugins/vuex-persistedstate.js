import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR }) => {
  if (isHMR) return;
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        storage: window.sessionStorage
      })(store);
    });
  }
};
// export default ({ store, req, app }) => {
//   createPersistedState({
//     storage: {
//       getItem: (key) => {
//         console.log(app.$cookiz.get(key));
//         return app.$cookiz.get(key);
//       },
//       setItem: (key, value) => {
//         return app.$cookiz.set(key, value, {
//           maxAge: 60 * 60 * 24 * 365,
//           secure: true
//         });
//       },
//       removeItem: (key) => app.$cookiz.remove(key)
//     }
//   })(store);
// };
