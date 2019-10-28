<template>
  <v-row dense align-content-start pa-1>
    <v-col
      v-for="writing of writings"
      :key="writing.id"
      :cols="cols"
    >
      <v-card :to="`/writings/${writing.id}`">
        <div class="d-flex">
          <div class="writing-wrap">
            <div :class="`writing writing-${writing.type}`">
              {{ writing.type }}
            </div>
          </div>
          <v-avatar class="my-3 ml-7 mr-1" size="64">
            <v-img :alt="writing.first_name" :src="writing.profile_image"></v-img>
          </v-avatar>
          <div class="writing-display">
            <v-card-title class="writing-title px-2">{{ writing.title }}</v-card-title>
            <v-card-subtitle class="px-2">{{ displayDate(writing.date) }}</v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Writings',
  data () {
    return {
      cols: 12,
      html: null,
      isWriting: true,
      selectMode: false,
      title: null,
      writings: []
    }
  },
  async created () {
    const { data } = await axios('/api/writings');
    this.writings = data;
    if (ResizeObserver) {
      const sizer = this.sizer = new ResizeObserver(
        ([{ contentRect: { width } }]) => (
          this.cols = width < 700 ? 12 :
            (width < 1050 ? 6 : 4)
        )
      );
      sizer.observe(this.$el);
    }
  },
  beforeDestroy () {
    if (this.sizer) {
      this.sizer.disconnect();
      delete this.sizer;
    }
  },
  methods: {
    async checkRoute () {
      const { id } = this.$route.params;
      this.isWriting = !!id;
      if (id) {
        const { data } = await axios.get(`/api/writings/${id}`);
        Object.assign(this, data);
      }
    },
    displayDate (date) {
      return moment(date).format('ll');
    }
  },
  watch: {
    $route: {
      handler: 'checkRoute',
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.writing-display {
  flex: 1;
  min-width: 0;
}
.writing-title {
  white-space: nowrap;
  overflow: hidden;
}
.writing-wrap {
  width: 88px;
  height: 88px;
  transform: rotate(-90deg);
  position: absolute;
  left: 0;
  top: 0;
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
}
.writing {
  font-size: 14px;
  text-align: center;
  color: white;
  font-variant: small-caps;
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
}
.writing-poem {
  background-color: lightblue;
}
.writing-story {
  background-color: lightcoral;
}
.writing-letter {
  background-color: lightgreen;
}
</style>
