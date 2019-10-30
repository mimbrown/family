<template>
  <FormWrap>
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
  </FormWrap>
</template>

<script>
import FormWrap from './FormWrap';

export default {
  components: {
    FormWrap
  },
  name: 'SnapshotForm',
  data () {
    return {
      model: {
        description: null
      },
      required: v => !!v || 'This field is required'
    };
  }
};
</script>
