const state = () => ({
  webData: {
    FAQ: [],
    campName: '',
    campPeople: '',
    campTime: '',
    campRegister: '',
    convenor: '',
    convenorPhone: '',
    inCharge: '',
    inChargePhone: '',
    remittanceAccName: '',
    registerFee: '',
    AnnounceTime: '',
    remittanceTime: '',
    refundFifty: '',
    refundTwenty: '',
    RecapVlog: '',
    albumSite: '',
    RegisterStatus: ''
  },
  usersStatus: [],
  shirtImage: '',
  frontPageImage: [],
  consent: ''
});

const getters = {
  GetFrontPageImage: (state) => state.frontPageImage,
  GetFAQ: (state) => state.webData.FAQ,
  GetContactInfo: (state) => {
    const { convenor, convenorPhone, inCharge, inChargePhone } = state.webData;
    return { convenor, convenorPhone, inCharge, inChargePhone };
  },
  GetCampInfo: (state) => {
    const {
      campName,
      campPeople,
      campTime,
      campRegister,
      registerFee,
      RecapVlog,
      albumSite
    } = state.webData;
    return {
      campName,
      campPeople,
      campTime,
      campRegister,
      registerFee,
      RecapVlog,
      albumSite
    };
  },
  GetSignUpInfo: (state) => {
    const { consent, webData, usersStatus } = state;
    const {
      refundFifty,
      refundTwenty,
      AnnounceTime,
      remittanceAccName,
      registerFee,
      remittanceTime,
      RegisterStatus
    } = webData;
    return {
      refundFifty,
      refundTwenty,
      AnnounceTime,
      remittanceAccName,
      registerFee,
      remittanceTime,
      consent,
      usersStatus,
      RegisterStatus
    };
  },
  GetShirtImage: (state) => state.shirtImage
};

const mutations = {
  SetWebData(state, data) {
    state.webData = data;
  },
  SetUsersStatus(state, data) {
    state.usersStatus = data;
  },
  SetFrontPageImage(state, data) {
    state.frontPageImage = data;
  },
  SetShirtImage(state, data) {
    state.shirtImage = data;
  },
  SetConsent(state, data) {
    state.consent = data;
  }
};

const actions = {
  async FetchWebData({ commit }) {
    try {
      const website = await this.$api.web.getWebsite();
      commit('SetWebData', website);
    } catch (error) {
      console.log(error);
    }
  },
  async FetchUsersStatus({ commit }) {
    try {
      const UsersStatus = await this.$api.user.getUsersStatus();
      commit('SetUsersStatus', UsersStatus);
    } catch (error) {
      console.log(error);
    }
  },
  async FetchFrontPageImage({ commit }) {
    try {
      const frontPageImage = await this.$api.file.getFiles({
        filter: { type: 'FrontPage' }
      });
      commit('SetFrontPageImage', frontPageImage);
    } catch (error) {
      console.log(error);
    }
  },
  async FetchShirtImage({ commit }) {
    try {
      const shirtImage = await this.$api.file.getFiles({
        filter: { type: 'Shirt' }
      });
      commit('SetShirtImage', shirtImage.data[0].path);
    } catch (error) {
      console.log(error);
    }
  },
  async FetchConsent({ commit }) {
    try {
      const consent = await this.$api.file.getFiles({
        filter: { type: 'Consent' }
      });
      commit('SetConsent', consent.data[0].path);
    } catch (error) {
      console.log(error);
    }
  }
};

export default { namespaced: true, state, getters, mutations, actions };
