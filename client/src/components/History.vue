<template>
  <v-layout row wrap pa-3 justify-center>
    <v-flex xs12 sm10 md8>
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
    </v-flex>
    <v-flex
      v-if="chapter"
      v-html="chapter.html"
      xs12 sm10 md8
    />
  </v-layout>
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