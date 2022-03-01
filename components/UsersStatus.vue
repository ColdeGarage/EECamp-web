<template>
  <div>
    <div class="text-Heading30">錄取名單（綠底代表已繳費，灰底表示放棄）</div>
    <v-divider class="my-4" />
    <v-row no-gutters>
      <v-col
        v-for="(user, i) in Users.UsersStatusChosen"
        :key="`${user.chineseName}-${i}`"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
      >
        <v-sheet
          :color="
            user.status === 'Paid'
              ? 'green'
              : user.status === 'Unpaid'
              ? ''
              : 'grey'
          "
          :class="`${
            user.status === 'Unpaid' ? 'secondary' : 'secondary900'
          }--text`"
          height="30"
          outlined
          class="d-flex align-center justify-center"
        >
          {{ user.chineseName }}
        </v-sheet>
      </v-col>
    </v-row>
    <SizeBox height="50" />
    <div class="text-Heading20 d-flex justify-center">
      備取（順序由左至右，由上至下）
    </div>
    <v-divider class="my-4" />
    <v-row no-gutters>
      <v-col
        v-for="(user, i) in Users.UsersStatusAlternate"
        :key="`${user.chineseName}-${i}`"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        class="pa-0"
      >
        <v-sheet
          height="30"
          outlined
          class="d-flex align-center justify-center"
        >
          {{ user.chineseName }}
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({ Users: 'Web/GetUsersStatus' })
  }
};
</script>

<style lang="scss" scoped>
//
</style>
