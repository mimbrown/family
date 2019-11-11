<template>
  <FormWrap ref="main" :editing="editing" @save="save" @cancel="cancel">
    <v-text-field
      v-model="model.title"
      label="Title"
      :rules="[required]"
      required
    />
    <v-textarea
      v-model="model.description"
      label="Description"
      type="text"
      :rules="[required]"
      required
    />
    <DateField
      v-model="model.snapshot_date"
      label="Date"
      required
    />
    <ArrayField v-model="model.images" cols="12" cls="col-sm-6 col-md-4" sortable>
      <template v-slot:item="{ commit, index, item }">
        <ImageField :value="item" @input="commit($event.src, index)" style="flex: 1;" />
      </template>
    </ArrayField>
  </FormWrap>
</template>

<script>
import FormWrap from './FormWrap';
import FormBase from './FormBase';
import ArrayField from '../ArrayField';
import DateField from '../DateField';
import ImageField from '../ImageField';

export default {
  components: {
    ArrayField,
    DateField,
    ImageField,
    FormWrap
  },
  mixins: [FormBase],
  name: 'SnapshotForm',
  data () {
    return {
      model: {
        attributes: null,
        description: null,
        images: null,
        snapshot_date: null,
        title: null
      },
      src: '/api/snapshots'
    };
  }
};
</script>
