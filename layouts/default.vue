<template>
  <v-app>
    <CHeader />
    <SideDrawer />
    <v-main>
      <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  //
};
</script>
