<template>
  <v-card>
    <v-data-table :headers="headers" :items="users" multi-sort>
      <template v-slot:top>
        <SizeBox height="10" />
        <div class="full-width d-flex justify-space-between align-center mx-5">
          <div class="text-Heading30">學員資料</div>
          <v-btn @click="downloadFile" color="primary" small>
            下載學員資料
          </v-btn>
        </div>
      </template>

      <template v-slot:[`item.link`]="{ item }">
        <NuxtLink
          :to="`/admin/${item._id}`"
          class="text-decoration-none"
          target="_blank"
        >
          <v-icon small>mdi-link-variant</v-icon>
        </NuxtLink>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { parse } from 'json2csv';

export default {
  data: () => ({
    headers: [
      { text: '中文名字', align: 'start', value: 'chineseName' },
      { text: '性別', value: 'gender' },
      { text: '學校', value: 'school' },
      { text: '狀態', value: 'status' },
      { text: '連結', value: 'link', sortable: false }
    ],
    users: []
  }),
  created() {
    this.getUsers();
  },
  methods: {
    async downloadFile() {
      const res = await this.$api.user.getUsers({
        filter: { isAdmin: false },
        projection:
          'chineseName birthday personalID phoneNumber email emergencyName emergencyPhoneNumber shirtSize specialDiet specialDisease',
        limit: null
      });
      const fields = [
        { value: 'index', label: 'index' },
        { value: 'chineseName', label: '中文姓名' },
        { value: 'birthday', label: '生日' },
        { value: 'personalID', label: '身分證字號' },
        { value: 'phoneNumber', label: '手機號碼' },
        { value: 'email', label: 'Email' },
        { value: 'emergencyName', label: '緊急聯絡人' },
        { value: 'emergencyPhoneNumber', label: '緊急聯絡人電話' },
        { value: 'shirtSize', label: '營服大小' },
        { value: 'specialDisease', label: '特殊疾病' },
        { value: 'specialDiet', label: '特殊飲食習慣' }
      ];
      const preprocessedData = res.data.map((item, i) => ({
        index: i,
        ...item,
        birthday: new Date(item.birthday).toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })
      }));
      const csv = parse(preprocessedData, { fields });

      const fileName = '學員資料' + '.csv';
      const link = document.createElement('a');
      link.setAttribute(
        'href',
        'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv)
      );
      link.setAttribute('download', fileName);
      link.click();
    },
    async getUsers() {
      const res = await this.$api.user.getUsers({
        limit: null,
        filter: { isAdmin: false },
        projection: 'chineseName gender school status'
      });
      this.users = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
