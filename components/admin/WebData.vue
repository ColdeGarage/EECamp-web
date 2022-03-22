<template>
  <v-sheet>
    <v-card class="pa-5">
      <div class="text-Heading30 mb-3">網頁資料</div>
      <v-form :model="web" ref="form">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="web.RegisterStatus"
              :rules="rules.noEmpty"
              :items="status"
              label="報名進度"
            />
          </v-col>
          <v-col v-for="item in items" :key="item.model" cols="12" md="6">
            <v-text-field
              v-model="web[`${item.model}`]"
              :rules="rules[`${item.rule}`]"
              :label="item.label"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-alert dense outlined type="warning" v-if="alert">
        {{ new Date().toLocaleString('en-US') }} {{ alertMessage }}
      </v-alert>
      <v-alert dense outlined type="success" v-if="success">
        {{ new Date().toLocaleString('en-US') }} 成功送出
      </v-alert>
      <SizeBox height="10" />
      <v-btn color="primary" width="100%" @click="handleSubmit">送出資料</v-btn>
    </v-card>
    <!-- TODO: Add modify FAQ -->
    <!-- <SizeBox height="20" />
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="web.FAQ">
        <template v-slot:top>
          <SizeBox height="10" />
          <div class="full-width d-flex justify-space-between align-center">
            <div class="text-Heading30">常見問題</div>
            <v-btn @click="handleNewFAQ" color="info">新增資料</v-btn>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{}">
          <v-icon small class="mr-1" @click="handleNewFAQ">mdi-pencil</v-icon>
          <v-icon small @click="handleNewFAQ">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card> -->
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    web: {},
    status: [
      { value: 'register', text: '報名中' },
      { value: 'fillingUp', text: '遞補中' },
      { value: 'done', text: '結束' }
    ],
    alert: false,
    alertMessage: '',
    success: false,
    headers: [
      { text: '問題', value: 'Ques' },
      { text: '回答', value: 'Ans' },
      { text: '操作', value: 'actions', width: '100px' }
    ],
    rules: {
      noEmpty: [(v) => !!v || '請勿留白'],
      url: [
        (v) => !!v || '請勿留白',
        (v) =>
          /^((http|https|ftp):\/\/)/.test(v) ||
          '須為連結（開始為 https:// 或是 http://）'
      ],
      number: [
        (v) => !!v || '請勿留白',
        (v) => /^[0-9]*$/.test(v) || '須為正整數'
      ]
    },
    items: [
      {
        model: 'campName',
        rule: 'noEmpty',
        label: '營隊名稱'
      },
      {
        model: 'campPeople',
        rule: 'number',
        label: '營隊人數'
      },
      {
        model: 'campTime',
        rule: 'noEmpty',
        label: '營期'
      },
      {
        model: 'campRegister',
        rule: 'noEmpty',
        label: '報名時間'
      },
      {
        model: 'convenor',
        rule: 'noEmpty',
        label: '總籌'
      },
      {
        model: 'convenorPhone',
        rule: 'noEmpty',
        label: '總籌手機'
      },
      {
        model: 'inCharge',
        rule: 'noEmpty',
        label: '招生負責人'
      },
      {
        model: 'inChargePhone',
        rule: 'noEmpty',
        label: '招生負責人手機'
      },
      {
        model: 'remittanceAccName',
        rule: 'noEmpty',
        label: '匯款帳戶'
      },
      {
        model: 'registerFee',
        rule: 'number',
        label: '報名費'
      },
      {
        model: 'AnnounceTime',
        rule: 'noEmpty',
        label: '正備取公布時間'
      },
      {
        model: 'remittanceTime',
        rule: 'noEmpty',
        label: '正取匯款時間'
      },
      {
        model: 'refundFifty',
        rule: 'noEmpty',
        label: '退費50%日期'
      },
      {
        model: 'refundTwenty',
        rule: 'noEmpty',
        label: '退費25%日期'
      },
      {
        model: 'RecapVlog',
        rule: 'url',
        label: '回顧影片網址 (youtube)'
      },
      {
        model: 'albumSite',
        rule: 'url',
        label: '相簿網址'
      }
    ]
  }),
  created() {
    this.getWeb();
  },
  methods: {
    async getWeb() {
      const res = await this.$api.web.getWebsite();
      this.web = res;
    },
    // handleNewFAQ() {
    //   console.log('hi');
    // },
    async handleSubmit() {
      this.alert = false;
      this.alertMessage = '';
      this.success = false;
      const validateResult = await this.$refs.form.validate();
      if (validateResult) {
        try {
          delete this.web._id;
          delete this.web.__v;
          await this.$api.web.modifyWebsite(this.web);
        } catch (error) {
          this.alert = true;
          this.alertMessage = '上傳失敗';
          console.error(error);
          return;
        }
        this.success = true;
      } else {
        this.alert = true;
        this.alertMessage = '資料有誤';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
