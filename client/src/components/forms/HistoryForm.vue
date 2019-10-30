<template>
  <FormWrap ref="main" :editing="editing" @save="save">
    <v-text-field
      v-model="model.title"
      label="Title"
      :rules="[required]"
      required
    />
    <RichTextEditor
      v-model="model.html"
    />
  </FormWrap>
</template>

<script>
import FormWrap from './FormWrap';
import RichTextEditor from './RichTextEditor';
import FormBase from './FormBase';

export default {
  components: {
    FormWrap,
    RichTextEditor
  },
  mixins: [FormBase],
  name: 'HistoryForm',
  data () {
    return {
      model: {
        html: null,
        title: null
      },
      src: '/api/chapters'
    };
  }
};
</script>
