<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-select
        v-model="chapter"
        :items="chapters"
      >
        <template v-slot:selection="{ item }">
          {{ displayChapter(item) }}
        </template>
        <template v-slot:item="{ item }">
          {{ displayChapter(item) }}
        </template>
      </v-select>
    </v-col>
    <v-col
      v-if="chapter"
      v-html="chapter.html"
      class="history-content"
      cols="12" sm="10" md="8"
    />
    <HistoryForm ref="editForm" :editing="editing" @edited="onEdited" @added="onAdded" />
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
        if (id) {
          return chapters.find(chapter => chapter.id === id);
        } else {
          return chapters[0];
        }
      },
      set (chapter) {
        if (chapter !== this.chapter) {
          this.$router.push({ path: `/history/${chapter.id}` });
        }
      }
    }
  },
  methods: {
    onEdited (model) {
      Object.assign(this.chapter, model);
    },
    onAdded (model) {
      const { chapters, $router } = this;
      let i = 0;
      for (; i < chapters.length; i++) {
        if (chapters[i].chapter_date > model.chapter_date) {
          break;
        }
      }
      chapters.splice(i, 0, model);
      $router.push({ path: `/history/${model.id}` });
    },
    displayChapter (item) {
      return `Chapter ${this.chapters.indexOf(item) + 1} - ${item.title} (${moment(item.chapter_date).format('MM/DD/YYYY')})`;
    },
    getModel () {
      const { chapter } = this;
      const model = Object.assign({}, chapter);
      return { id: chapter.id, model };
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
