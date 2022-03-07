<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <AdminEditUser :form="user" :userId="id" />
    <SizeBox height="20" />
    <AdminPaidInfo :form="user" />
    <SizeBox height="20" />
    <AdminTransMethod :form="user" />
    <SizeBox height="20" />
    <PanelEditForm :form="user" :editable="false" />
  </v-container>
</template>

<script>
export default {
  async asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  data: () => ({
    user: {}
  }),
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const res = await this.$api.user.getUser({ _id: this.id });

      const localISOTime = new Date(new Date(res.birthday) - tzoffset)
        .toISOString()
        .slice(0, 10);
      res.birthday = localISOTime;

      this.user = res;
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
