<template>
  <v-carousel cycle height="calc(100vh - 64px)">
    <v-system-bar lights-out></v-system-bar>
    <v-carousel-item v-for="(image, i) in images" :key="i" eager>
      <v-sheet width="100%" height="100%">
        <v-img
          :src="`${baseUrl}${image.path}`"
          class="d-flex align-center"
          height="100%"
          width="100%"
        >
          <div
            class="d-flex fill-width justify-center text-center secondary900--text text-Heading42 text-md-Heading72 font-weight-bold TextShadow"
          >
            {{ image.description }}
          </div>
        </v-img>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    // images: [
    //   {
    //     src: 'https://picsum.photos/2000/1000',
    //     text: 'NTHU EECAMP'
    //   },
    //   {
    //     src: 'https://picsum.photos/4000/2500',
    //     text: 'Learn New things'
    //   },
    //   {
    //     src: 'https://picsum.photos/4000/2300',
    //     text: 'Make New Friends'
    //   },
    //   {
    //     src: 'https://picsum.photos/2000/1000?random=1',
    //     text: 'Memories Forever'
    //   },
    //   {
    //     src: 'https://picsum.photos/2000/1000?random=2',
    //     text: 'Coding Is Fun'
    //   }
    // ]
  }),
  computed: {
    ...mapGetters({ images: 'Web/GetFrontPageImage' }),
    baseUrl: () => process.env.baseUrl
  }
};
</script>

<style lang="scss" scoped>
.TextShadow {
  text-shadow: 0.1em 0.1em 0.2em #000000;
}
</style>
