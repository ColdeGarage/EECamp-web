<template>
  <v-container class="px-6 px-md-0">
    <v-alert text color="warning" border="left" class="pa-4">
      今年新增： 自己做的Arduino車車，自己帶回家!!
    </v-alert>
    <v-row>
      <v-col cols="12" md="5">
        <div class="text-Heading30">總籌的話</div>
        <v-divider class="my-2" />
        <div>
          清大電機營自 1980 年來
          <br />
          每年暑假在美麗的清大校園
          <br />
          等待著全國各地的高中生
          <br />
          前來與我們交織瑰麗的七天回憶
          <br />
          在這短短的一週
          <br />
          有隊輔精心準備的課程
          <br />
          為你解開電機系的神秘面紗
          <br />
          大學教授的精彩演講
          <br />
          帶你領略大師風範
          <br />
          每天精彩的活動讓你體驗大學的熱情
          <br />
          點燃心中青春的火焰！
          <br />
          今年，給自己一個不一樣的夏天
          <br />
          快來參加清大電機營吧！
          <br />
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <div class="text-Heading30">Social Media</div>
        <v-divider class="my-2" />
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <v-btn
            href="https://www.facebook.com/NTHUEECAMP/"
            target="_blank"
            color="#3b5998"
            class="secondary900--text text-Global18"
            :width="$vuetify.breakpoint.mdAndUp ? '47%' : '100%'"
            height="50px"
          >
            <v-icon large>mdi-facebook</v-icon>
            <SizeBox width="10" />
            Facebook 粉絲專頁
          </v-btn>
          <SizeBox height="15" />
          <v-btn
            :href="campInfo.albumSite"
            target="_blank"
            color="#0F9D58"
            class="secondary900--text text-Global18"
            :width="$vuetify.breakpoint.mdAndUp ? '47%' : '100%'"
            height="50px"
          >
            <v-icon large>mdi-folder-google-drive</v-icon>
            <SizeBox width="10" />
            More Pictures!
          </v-btn>
        </div>
        <SizeBox height="10" />
        <v-sheet width="100%">
          <youtube
            :video-id="$getIdFromUrl(campInfo.RecapVlog)"
            :player-vars="playerVars"
            fitParent
            resize
            :mute="true"
            ref="youtube"
          />
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-Heading30">營隊資訊</div>
        <v-divider class="my-2" />
        <div>
          <ul>
            <li>營隊名稱：{{ campInfo.campName }}</li>
            <li>營隊日期：{{ campInfo.campTime }}</li>
            <li>活動地點：清華大學校園</li>
            <li>住宿：清華大學學生宿舍</li>
            <li>報名時間：{{ campInfo.campRegister }}</li>
            <li>招收學員數：{{ campInfo.campPeople }} 人</li>
            <li>活動費用：新臺幣 {{ campInfo.registerFee }} 元</li>
            <li>營隊開始時間：第一天上午 10:00 - 12:00 於台達館一樓報到</li>
            <li>營隊結束時間：最後一天約 15:30 於台達館一樓</li>
          </ul>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-Heading30">交通方式</div>
        <v-divider class="my-2" />
        <ul>
          <li class="text-Heading20 font-weight-bold">火車、高鐵</li>
          <div>
            營隊在始業式當天，會派人到高鐵站跟火車站做迎接，之後搭公車帶至清大校園。營隊結束時隊輔也會陪同學員回火車站、高鐵站上車（建議搭乘
            16:30 過後的班次）。
          </div>
          <li class="text-Heading20 font-weight-bold">客運</li>
          <div>
            清華大學站下車，並前往清大光復路大門，會有隊輔帶回台達館報到。營隊結束時隊輔也同樣會帶學員去校門口搭車（建議搭乘
            16:00 過後的班次）。
          </div>
          <li class="text-Heading20 font-weight-bold">自行開車</li>
          <div>
            可直接到清大台達館一樓報到或是在校門口與搭乘客運同學一起隨隊輔帶去台達館。營隊結束時請家長到台達館一樓接學員。
          </div>
        </ul>
        <div class="text-right mt-2">
          更多資訊可以參考
          <a
            href="http://admission.nthu.edu.tw/p/412-1207-17242.php"
            target="_blank"
          >
            如何前往清華大學
          </a>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-Heading30">課程相關</div>
        <v-divider class="my-2" />
        <div>
          電機系基礎課程、Arduino
          實作、FPGA介紹、網頁介紹、電機八大領域介紹⋯⋯等，以讓高中生中生探索電機系為主要目的，不會過於艱澀。
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    playerVars: {
      autoplay: 1,
      mute: 1
    }
    // campName: '2021清大電機營 - E 起來學電',
    // campPeople: '96',
    // campTime: '2021.7.24 - 2021.7.30 （共計 7 天 6 夜）',
    // campRegister: '2021.3.8 - 2021.5.7',
    // registerFee: 6000,
    // RecapVlog: 'https://youtu.be/AJZ2y7-dacM',
    // albumSite:
    //   'https://drive.google.com/drive/folders/1Dm-4ouSc3e01doug2hyo5RLkIU2j3DYi'
  }),
  computed: {
    ...mapGetters({
      campInfo: 'Web/GetCampInfo'
    })
  }
};
</script>

<style lang="scss" scoped>
//
</style>
