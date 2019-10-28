<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-combobox
        v-model="chapter"
        :items="chapters"
        type="button"
      >
        <template v-slot:selection="{ item }">
          {{ displayChapter(item) }}
        </template>
        <template v-slot:item="{ item }">
          <v-list-tile-content>
            {{ displayChapter(item) }}
          </v-list-tile-content>
        </template>
      </v-combobox>
    </v-col>
    <v-col
      v-if="chapter"
      v-html="chapter.html"
      cols="12" sm="10" md="8"
    />
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'History',

  data () {
    return {
      chapters: [],
      title: null,
      html: null
    }
  },

  async created () {
    const {
      data
    } = await axios.get('/api/chapters');
    this.chapters = data;
  },
  computed: {
    chapter: {
      get () {
        const { chapters, $route } = this;
        const { id } = $route.params;
        const chapterNum = Number(id);
        return chapters.find(chapter => chapter.chapter_num === chapterNum);
      },
      set (chapter) {
        this.$router.push({ path: `/history/${chapter.chapter_num}` });
      }
    }
  },
  methods: {
    displayChapter (item) {
      return `Chapter ${item.chapter_num} - ${item.title}`;
    }
  }
};
</script>

<style>
.float-right {
  width: 300px;
  max-width: 50%;
  float: right;
  border-radius: 5px;
  margin-left: 15px;
  transform: rotate(5deg);
}
.float-left {
  width: 300px;
  max-width: 50%;
  float: left;
  border-radius: 5px;
  margin-right: 15px;
  transform: rotate(-5deg);
}
</style>
