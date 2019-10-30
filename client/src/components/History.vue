<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-autocomplete
        v-model="chapter"
        :items="chapters"
        type="button"
      >
        <template v-slot:selection="{ item }">
          {{ displayChapter(item) }}
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-content>
            {{ displayChapter(item) }}
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col
      v-if="chapter"
      v-html="chapter.html"
      class="history-content"
      cols="12" sm="10" md="8"
    />
    <HistoryForm ref="editForm" :editing="editing" @commit="commitModel" />
  </v-row>
</template>

<script>
import axios from 'axios';
import HistoryForm from './forms/HistoryForm';
import Editable from './Editable';

export default {
  name: 'History',

  mixins: [Editable],

  components: {
    HistoryForm
  },

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
    commitModel (model) {
      Object.assign(this.chapter, model);
    },
    displayChapter (item) {
      return `Chapter ${item.chapter_num} - ${item.title}`;
    },
    getModel () {
      const { chapter } = this;
      const model = Object.assign({}, chapter);
      delete model.chapter_num;
      return { id: chapter.chapter_num, model };
    }
  }
};
</script>

<style>
.history-content img {
  width: 300px;
  max-width: 50%;
  border-radius: 5px;
}
.history-content img:nth-of-type(odd) {
  float: right;
  margin-left: 15px;
  transform: rotate(5deg);
}
.history-content img:nth-of-type(even) {
  float: left;
  margin-right: 15px;
  transform: rotate(-5deg);
}
</style>
