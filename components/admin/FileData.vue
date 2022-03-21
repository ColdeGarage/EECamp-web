<template>
  <v-card class="pa-5">
    <div class="text-Heading30 mb-3">網頁檔案</div>
    <v-data-table :headers="headers" :items="photos">
      <template v-slot:top>
        <SizeBox height="10" />
        <div class="full-width d-flex justify-space-between align-center">
          <div class="text-Heading20">首頁圖片</div>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="editIndex = -1"
              >
                新增消息
              </v-btn>
            </template>
            <v-card class="pa-5">
              <v-card-title class="d-flex justify-center">
                <div class="text-Heading20">{{ formTitle }}</div>
              </v-card-title>
              <v-form ref="newFile">
                <v-text-field
                  v-model="newDescription"
                  :rules="rules.noEmpty"
                  label="文字"
                />
                <v-file-input v-model="newFile" :rules="rules.photo" />
              </v-form>
              <v-alert dense outlined type="warning" v-if="alert">
                {{ alertMessage }}
              </v-alert>
              <v-btn width="100%" color="primary" @click="handleAddFile">
                送出
              </v-btn>
            </v-card>
          </v-dialog>
        </div>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">確定要刪除嗎？</v-card-title>
            <v-alert dense outlined type="warning" v-if="alert" class="mx-4">
              {{ alertMessage }}
            </v-alert>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.link`]="{ item }">
        <v-btn icon :href="`${baseUrl}${item.path}`" target="_blank">
          <v-icon small class="mr-1">mdi-link-variant</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- TODO: edit -->
        <!-- <v-icon small class="mr-1" @click="handleNewFAQ">mdi-pencil</v-icon> -->
        <v-icon small @click="handleRemoveFile(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-sheet class="d-flex align-center">
      <v-btn :href="`${baseUrl}${consent.path}`" target="_blank">
        家長同意書連結
      </v-btn>
      <SizeBox width="30" />
      <v-form ref="newConsent" class="fill-width">
        <v-file-input v-model="newConsent" :rules="rules.pdf" />
      </v-form>
      <SizeBox width="20" />
      <v-btn color="primary" @click="uploadConsent">更新</v-btn>
    </v-sheet>

    <v-sheet class="d-flex align-center justify-space-between">
      <v-btn :href="`${baseUrl}${shirt.path}`" target="_blank">
        營服尺寸參考圖
      </v-btn>
      <SizeBox width="30" />
      <v-form ref="newShirt" class="fill-width">
        <v-file-input v-model="newShirt" :rules="rules.photo" />
      </v-form>
      <SizeBox width="20" />
      <v-btn color="primary" @click="uploadShirt">更新</v-btn>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    files: [],
    photos: [],
    consent: {},
    newConsent: {},
    shirt: {},
    newShirt: {},
    headers: [
      { value: 'description', text: '文字' },
      { value: 'link', text: '連結' },
      { text: '操作', value: 'actions', width: '100px' }
    ],
    newDescription: '',
    newFile: {},
    deleteFile: {},
    rules: {
      noEmpty: [(v) => !!v || '請勿留白'],
      photo: [
        (v) => !!v || '請上傳照片',
        (v) =>
          (v && v.type && v.type.startsWith('image/')) ||
          '請上傳圖片檔（jpg, jpeg, png, gif, webp, svg）',
        (v) => (v && v.size && v.size <= 15000000) || '檔案請小於 15 MB'
      ],
      pdf: [
        (v) => !!v || '請上傳 PDF',
        (v) =>
          (v && v.type && v.type.startsWith('application/pdf')) || '請上傳 PDF',
        (v) => (v && v.size && v.size <= 15000000) || '檔案請小於 15 MB'
      ]
    },
    editIndex: -1,
    alert: false,
    alertMessage: ''
  }),
  computed: {
    baseUrl: () => process.env.baseUrl,
    formTitle() {
      return this.editIndex === -1 ? '新增圖片' : '編輯圖片';
    }
  },
  async created() {
    await this.getFiles();
  },
  methods: {
    async getFiles() {
      const res = await this.$api.file.getFiles();
      this.photos = res.data.filter((i) => i.type === 'FrontPage');
      this.consent = res.data.filter((i) => i.type === 'Consent')[0];
      this.shirt = res.data.filter((i) => i.type === 'Shirt')[0];
    },
    async handleNewFAQ() {},
    async handleAddFile() {
      this.alert = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.newFile.validate();
      if (validateResult) {
        try {
          await this.$api.file.upload(this.newFile, {
            'Content-Type': this.newFile.type,
            fileName: encodeURIComponent(this.newFile.name),
            description: this.newDescription,
            fileType: 'FrontPage'
          });
        } catch (error) {
          console.error(error);
          this.alert = true;
          this.alertMessage = '上傳失敗';
        }
        this.newFile = null;
        this.newDescription = '';
        this.dialog = false;
        this.getFiles();
      } else {
        this.alert = true;
        this.alertMessage = '資料有誤';
      }
    },
    handleRemoveFile(item) {
      this.dialogDelete = true;
      this.deleteFile = item;
    },
    cancelDelete() {
      this.dialogDelete = false;
      this.alert = false;
      this.alertMessage = '';
    },
    async deleteItemConfirm() {
      const { _id } = this.deleteFile;
      try {
        await this.$api.file.removeFile({ _id });
        this.getFiles();
        this.dialogDelete = false;
      } catch (error) {
        console.error(error);
        this.alert = true;
        this.alertMessage = '刪除失敗';
      }
    },
    async uploadConsent() {
      this.alert = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.newConsent.validate();
      const { _id } = this.consent;
      if (validateResult) {
        try {
          await this.$api.file.removeFile({ _id });
          await this.$api.file.upload(this.newConsent, {
            'Content-Type': this.newConsent.type,
            fileName: encodeURI(this.newConsent.name),
            fileType: 'Consent'
          });
        } catch (error) {
          console.error(error);
          this.alert = true;
          this.alertMessage = '上傳失敗';
        }
        this.newFile = null;
        this.newDescription = '';
        this.dialog = false;
        this.getFiles();
      } else {
        this.alert = true;
        this.alertMessage = '資料有誤';
      }
    },
    async uploadShirt() {
      this.alert = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.newShirt.validate();
      const { _id } = this.shirt;
      if (validateResult) {
        try {
          await this.$api.file.removeFile({ _id });
          await this.$api.file.upload(this.newShirt, {
            'Content-Type': this.newShirt.type,
            fileName: encodeURI(this.newShirt.name),
            fileType: 'Shirt'
          });
        } catch (error) {
          console.error(error);
          this.alert = true;
          this.alertMessage = '上傳失敗';
        }
        this.newFile = null;
        this.newDescription = '';
        this.dialog = false;
        this.getFiles();
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
