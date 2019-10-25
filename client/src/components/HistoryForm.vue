<template>
  <EditForm @save="save">
    <v-text-field
      v-model="model.title"
      label="Title"
      :rules="[required]"
      required
    />
    <RichTextEditor
      v-model="model.text"
    />
  </EditForm>
</template>

<script>
import EditForm from './EditForm';
import RichTextEditor from './RichTextEditor';

export default {
  components: {
    EditForm,
    RichTextEditor
  },
  name: 'HistoryForm',
  data () {
    return {
      model: {
        text: null,
        title: null
      },
      required: v => !!v || 'This field is required'
    };
  },
  methods: {
    save () {
      debugger
    }
  }
};
</script>
