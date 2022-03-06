<template>
  <v-container>
    <AdminUsersData />
    <SizeBox height="20" />
    <AdminWebData />
    <SizeBox height="20" />
    <AdminFileData />
    <SizeBox height="20" />
    <AdminDangerZone />
  </v-container>
</template>

<script>
export default {
  middleware: 'adminAuth'
};
</script>

<style lang="scss" scoped>
//
</style>
