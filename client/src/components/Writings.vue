<template>
  <v-layout row wrap align-content-start pa-1>
    <v-flex
      v-for="writing of writings"
      :key="writing.id"
      xs6 sm4 lg3
    >
      <v-card hover class="ma-1" :to="`/writings/${writing.id}`">
        <div :class="`writing writing-${writing.type}`"></div>
        <v-card-text class="pt-0">
          <!-- {{ writing.title }} -->
          <div>
            <div class="headline">{{ writing.title }}</div>
            <div class="grey--text">By {{ writing.author }}</div>
            <div class="grey--text">{{ displayDate(writing.date) }}</div>
          </div>
        </v-card-text>
        <!-- <div class="author">By {{ writing.author }}</div>
        <div class="date">{{ displayDate(writing.date) }}</div> -->
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Writings',
  data () {
    return {
      writings: []
    }
  },
  async created () {
    const { data } = await axios('/api/writings');
    this.writings = data;
  },
  methods: {
    displayDate (date) {
      return moment(date).format('ll');
    }
  }
};
</script>

<style lang="scss">
.writing {
    font-size: 80px;
    // height: 100px;
    // padding: 9px 0;
}
.writing-poem {
    &::before {
        content: "[ P ]";
    }
    color: lightblue;
}
.writing-story {
    &::before {
        content: "[ S ]";
    }
    color: lightcoral;
}
.writing-letter {
    &::before {
        content: "[ L ]";
    }
    color: lightgreen;
}
</style>

