<template>
  <FormWrap ref="main" :editing="editing" @save="save" @cancel="cancel">
    <v-text-field
      v-model="model.title"
      label="Title"
      :rules="[required]"
      required
    />
    <DateField
      v-model="model.chapter_date"
      label="Date"
      required
    />
    <RichTextEditor
      v-model="model.html"
    />
  </FormWrap>
</template>

<script>
import FormWrap from './FormWrap';
import FormBase from './FormBase';
import RichTextEditor from './RichTextEditor';
import DateField from '../DateField';

export default {
  components: {
    DateField,
    FormWrap,
    RichTextEditor
  },
  mixins: [FormBase],
  name: 'HistoryForm',
  data () {
    return {
      model: {
        chapter_date: null,
        html: null,
        title: null
      },
      src: '/api/chapters'
    };
  }
};
</script>
