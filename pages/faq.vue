<template>
  <v-container>
    <div class="text-Heading30">常見問題</div>
    <v-divider class="my-4" />
    <ul>
      <div v-for="faq in faqs" :key="faq.question">
        <li>{{ faq.question }}</li>
        <SizeBox height="10" />
        <v-alert text border="left" :color="faq.color" class="pa-4">
          {{ faq.ans }}
        </v-alert>
        <SizeBox height="15" />
      </div>
    </ul>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    faqs: [
      {
        question: '清大電機營為什麼沒有提供每天的行程表？',
        ans: '此目的是希望保持活動的神祕感跟增加期待感。清大電機營這7天保證內容精彩可期，只要大家帶著一顆好奇與快樂的心，必能滿載而歸。',
        color: 'success'
      },
      {
        question: '報名要附照片的原因？',
        ans: '希望能在營期前就能給大哥哥、大姐姐們對大家有個初步的認識，因此不限定一定要大頭照，最近的生活照也可以喔。',
        color: 'info'
      },
      {
        question: '錄取方式？',
        ans: '錄取方式是採用電腦隨機亂數，基本上資料填的詳細可以增加錄取機會。',
        color: 'warning'
      },
      {
        question: '怎麼樣算是報名成功呢？',
        ans: '填完報名表單 + 上傳個人照片即完成報名，匯款資料、家長同意書、交通方式等確定錄取後才需要登錄、上傳。',
        color: 'error'
      },
      {
        question: '有團報優惠嗎？',
        ans: '目前本營隊沒有團報優惠，但仍然非常歡迎跟朋友一起來認識各地的新朋友！',
        color: 'purple'
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
//
</style>
