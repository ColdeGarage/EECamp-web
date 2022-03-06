<template>
  <v-container class="d-flex flex-column align-center">
    <div class="text-Heading36 mb-6 d-flex justify-center">報名表單</div>
    <v-card class="pa-10 ma-0" elevation="7" max-width="1400" width="100%">
      <v-form :model="form" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.chineseName"
              :rules="rules.chineseName"
              label="中文姓名"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.personalID"
              :rules="rules.personalID"
              label="身分證字號"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.nickName"
              label="綽號（選填）"
              placeholder="有的話就讓我們更認識你吧！"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              v-model="menu"
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.birthday"
                  :rules="rules.birthday"
                  label="生日"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.birthday"
                :rules="rules.birthday"
                :active-picker.sync="activePicker"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              label="Email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.gender"
              :rules="rules.gender"
              :items="genders"
              label="性別"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.bloodType"
              :rules="rules.bloodType"
              :items="bloodTypes"
              label="血型"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.school"
              :rules="rules.school"
              label="就讀學校"
              placeholder="OO高中"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.grade"
              :rules="rules.grade"
              :items="grades"
              label="年級"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.homeNumber"
              :rules="rules.homeNumber"
              label="住家電話"
              placeholder="03-5715131"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.phoneNumber"
              :rules="rules.phoneNumber"
              label="手機號碼（請留下可以讓我們連繫到您的號碼）"
              placeholder="0911222333"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.emergencyName"
              :rules="rules.emergencyName"
              label="緊急聯絡人姓名"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.emergencyPhoneNumber"
              :rules="rules.emergencyPhoneNumber"
              label="緊急聯絡人手機"
              placeholder="0911222333"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-text-field
              v-model="form.zipCode"
              :rules="rules.zipCode"
              label="3+2 郵遞區號"
              placeholder="30070"
              required
            />
            <SizeBox width="15" />
            <v-btn
              small
              href="http://www.post.gov.tw/post/internet/Postal/index.jsp?ID=208"
              target="_blank"
            >
              查詢
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.address"
              :rules="rules.address"
              label="聯絡地址"
              placeholder="新竹市光復路二段101號"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-select
              v-model="form.shirtSize"
              :rules="rules.shirtSize"
              :items="shirtSizes"
              label="營服大小"
              required
            />
            <SizeBox width="15" />
            <v-btn small :href="`${baseUrl}${shirtImage}`" target="_blank">
              尺寸查詢
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.vegan"
              :rules="rules.vegan"
              label="是否吃素"
              :items="yesNo"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.specialDiet"
              :rules="rules.specialDiet"
              label=" 特殊飲食習慣（沒有請填「無」）"
              placeholder="例如：不吃牛、不吃羊…"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.specialDisease"
              :rules="rules.specialDisease"
              label=" 特殊疾病（沒有請填「無」）"
              placeholder="例如：蠶豆症、氣喘…"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="file"
              :rules="rules.file"
              label="個人照片（請勿超過 15 MB）"
              prepend-icon="mdi-camera"
              show-size
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              auto-grow
              v-model="form.selfIntro"
              :rules="rules.selfIntro"
              label="自我介紹"
              placeholder="請寫一段自我介紹，內容可以是個性、興趣、專長、夢想等等，讓我們盡可能了解你。"
              counter
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              auto-grow
              v-model="form.motivation"
              :rules="rules.motivation"
              label="報名動機"
              placeholder="請說明你報名本營隊的動機和原因。"
              counter
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.previousCamp"
              label="曾經參加過的營隊（選填）"
              placeholder="請簡列你曾經參加過的營隊"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.howYouKnow"
              label=" 如何得知清大電機營的資訊（選填）"
              placeholder="例如：學校海報、同學邀約、網路搜尋…"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              auto-grow
              v-model="form.sthToSay"
              label="想說的話（選填）"
              placeholder="想要說的話 or 需要我們知道的事～"
              counter
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <v-alert dense outlined type="warning" v-if="alert">
        {{ alertMessage }}
      </v-alert>

      <div class="d-flex justify-center">
        <v-btn @click="handleSubmit" color="primary" large>送出報名資料</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import {
  isNationalIdentificationNumberValid,
  isResidentCertificateNumberValid,
  isNewResidentCertificateNumberValid
} from 'taiwan-id-validator';
import { mapGetters } from 'vuex';

export default {
  async middleware({ redirect, store }) {
    const { RegisterStatus } = store.getters['Web/GetSignupInfo'];
    if (RegisterStatus !== 'register') redirect('/registerEnd');
  },
  data: () => ({
    alert: false,
    alertMessage: '',
    menu: false,
    date: null,
    activePicker: null,
    genders: ['男', '女'],
    bloodTypes: ['A', 'B', 'AB', 'O', '未驗血'],
    grades: ['一年級', '二年級', '三年級'],
    shirtSizes: ['XS', 'S', 'M', 'L', 'XL', '2L', '3L', '4L', '5L'],
    yesNo: [
      { text: '是', value: true },
      { text: '否', value: false }
    ],
    file: null,
    form: {
      chineseName: '',
      photoPath: '',
      personalID: '',
      nickName: '',
      birthday: '',
      email: '',
      gender: '',
      bloodType: '',
      school: '',
      grade: '',
      homeNumber: '',
      phoneNumber: '',
      emergencyName: '',
      emergencyPhoneNumber: '',
      zipCode: '',
      address: '',
      shirtSize: '',
      vegan: '',
      specialDiet: '',
      specialDisease: '',
      selfIntro: '',
      motivation: '',
      previousCamp: '',
      howYouKnow: '',
      sthToSay: ''
    },
    rules: {
      chineseName: [(v) => !!v || '請輸入姓名'],
      personalID: [
        (v) => !!v || '請輸入身分證字號/居留號',
        (v) =>
          isNationalIdentificationNumberValid(v) ||
          isResidentCertificateNumberValid(v) ||
          isNewResidentCertificateNumberValid(v) ||
          '請輸入有效身分證字號或居留號'
      ],
      birthday: [(v) => !!v || '請輸入生日'],
      email: [
        (v) => !!v || '請輸入信箱',
        (v) => /.+@.+\..+/.test(v) || '須為有效信箱'
      ],
      gender: [(v) => !!v || '請輸入性別'],
      bloodType: [(v) => !!v || '請輸入血型'],
      school: [(v) => !!v || '請輸入學校'],
      grade: [(v) => !!v || '請輸入年級'],
      homeNumber: [
        (v) => !!v || '請輸入住家電話',
        (v) => /^\d{2}-\d{7}$/.test(v) || '請輸入正確住家電話'
      ],
      phoneNumber: [
        (v) => !!v || '請輸入手機號碼',
        (v) => /^09\d{8}$/.test(v) || '請輸入正確手機號碼'
      ],
      emergencyName: [(v) => !!v || '請輸入緊急聯絡人姓名'],
      emergencyPhoneNumber: [
        (v) => !!v || '請輸入手機號碼',
        (v) => /^09\d{8}$/.test(v) || '請輸入正確手機號碼'
      ],
      zipCode: [
        (v) => !!v || '請輸入郵遞區號',
        (v) => (v && /^\d{5}$/.test(v)) || '請輸入 3+2 郵遞區號'
      ],
      address: [(v) => !!v || '請輸入聯絡地址'],
      shirtSize: [(v) => !!v || '請輸入營服大小'],
      vegan: [(v) => typeof v === 'boolean' || '請輸入是否吃素'],
      specialDiet: [(v) => !!v || '請輸入特殊飲食習慣'],
      specialDisease: [(v) => !!v || '請輸入特殊疾病'],
      selfIntro: [(v) => !!v || '請輸入自我介紹'],
      motivation: [(v) => !!v || '請輸入報名動機'],
      file: [
        (v) => !!v || '請上傳個人照片',
        (v) =>
          (v && v.type && v.type.startsWith('image/')) ||
          '請上傳圖片檔（jpg, jpeg, png, gif, webp, svg）'
      ]
    }
  }),
  computed: {
    ...mapGetters({ shirtImage: 'Web/GetShirtImage' }),
    baseUrl: () => process.env.baseUrl
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async handleSubmit() {
      this.alert = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.form.validate();
      if (validateResult) {
        try {
          const fileUrl = await this.$api.file.save(this.file, {
            'Content-Type': this.file.type,
            fileName: encodeURIComponent(this.file.name)
          });
          this.form.photoPath = fileUrl.path;
        } catch (err) {
          this.alert = true;
          this.alertMessage = '檔案上傳失敗';
          return;
        }
        try {
          await this.$api.user.register(this.form);
        } catch (error) {
          console.error(error);
          this.alert = true;
          if (
            error.message ===
            'Failed to register, Error: Cannot create user, duplicate user.'
          )
            this.alertMessage = '報名資料重複，請再次確認。';
          else
            this.alertMessage =
              '報名失敗，請再次確認報名資料。如你認為結果有誤，請洽主辦單位。';
          return;
        }
        this.$router.push('/registerComplete');
      } else {
        this.alert = true;
        this.alertMessage = '表格資料有誤';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
