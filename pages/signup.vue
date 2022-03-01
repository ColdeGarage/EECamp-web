<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-Heading30">報名流程</div>
        <v-divider class="my-4" />
        <div class="my-4 text-Heading20 d-flex justify-center">
          清大電機營只開放官網報名！
        </div>
        <v-divider class="my-4" />
        <ol>
          <li>
            填寫
            <nuxt-link to="/register" class="text-decoration-none">
              報名表單
            </nuxt-link>
          </li>
          <li>
            透過
            <nuxt-link to="/login" class="text-decoration-none">
              登入系統
            </nuxt-link>
            進入個人帳號上傳個人相片完成報名
          </li>
          <li>等待正備取名單（{{ AnnounceTime }} 於官網以及 FB 粉專公布）</li>
          <li>錄取後正取者請登入系統選擇是否參加，備取者則請等候我們的通知</li>
          <li>確認參加後匯款，並登入個人帳號 → 新增匯款資料、上傳家長同意書</li>
          <li>經營隊確認無誤後，就可以參加清大電機營了！</li>
          <li>最後請在營期的三天前登入個人帳號 → 登記交通方式</li>
        </ol>
        <v-alert text color="info" border="top" class="pa-4 my-4">
          在報名截止前都可以進入報名系統修改報名資料。
        </v-alert>
        <v-alert text color="error" border="top" class="pa-4 my-4">
          營期前一周會寄出營前通知書，報名資料務必填寫確實！
        </v-alert>
        <v-alert text color="error" border="top" class="pa-4 my-4">
          {{ refundFifty }} 以前因故不能來者退費 50%，{{ refundTwenty }} 前退
          25%，之後一律不退費。
        </v-alert>
      </v-col>
      <v-col cols="12" md="6">
        <div>
          <div class="text-Heading30">繳費資料</div>
          <v-divider class="my-4" />
          <div class="d-flex justify-center my-2">
            匯款帳號：006102-1 060436-1
            <br />
            匯款戶名（郵局）：{{ remittanceAccName }}
            <br />
            報名費用：新臺幣 {{ registerFee }} 元整
          </div>
          <ul>
            <li>
              正取的同學請在
              <strong>{{ remittanceTime }}</strong>
              以前匯款完畢！
            </li>
            <li>
              備取的同學，我們將在正取者放棄後馬上進行遞補並電話通知你們！請在接到通知的
              <strong>2 天內</strong>
              進行匯款，逾期即表示放棄錄取資格！
            </li>
          </ul>
          <v-alert text color="info" border="top" class="pa-4 my-4">
            匯款後請登入個人帳號，並點選「新增/更新繳費資料」
            來新增/更新您的繳費資料。經我們核對後沒有問題，會立刻更新您個人帳號的狀態為「已匯款」。
          </v-alert>
        </div>
        <div>
          <div class="text-Heading30">家長同意書</div>
          <v-divider class="my-4" />
          <a
            href="/pdf/consent.pdf"
            target="_blank"
            class="text-decoration-none"
          >
            下載
          </a>
          後列印並簽寫完畢（家長必須簽名和蓋章），之後掃描成電子檔並登入個人帳號點選
          「上傳家長同意書」上傳檔案。上傳完畢後您個人帳號的家長同意書狀態將變更為「已繳交」。
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    refundFifty: '6/15',
    refundTwenty: '6/30',
    AnnounceTime: '5/15',
    remittanceAccName: '國立清華大學電機營 柯佩妤',
    registerFee: 6000,
    remittanceTime: '6/14'
  })
};
</script>

<style lang="scss" scoped>
//
</style>
