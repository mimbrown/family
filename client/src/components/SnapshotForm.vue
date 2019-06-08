<template>
  <EditForm>
    <v-textarea
      v-model="model.description"
      label="Description"
      type="text"
      :rules="[required]"
      required
    />
    <v-text-field
      multiple="true"
      type="file"
    />
  </EditForm>
</template>

<script>
import EditForm from './EditForm';

export default {
  components: {
    EditForm
  },
  name: 'SnapshotForm',
  data () {
    return {
      model: {
        description: null
      },
      required: v => !!v || 'This field is required'
    }
  }
};
</script>
