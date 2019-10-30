import axios from 'axios';

export default {
  data () {
    return {
      id: null,
      originalModel: null,
      required: v => !!v || 'This field is required'
    };
  },
  methods: {
    activate () {
      this.$refs.main.active = true;
    },
    async save () {
      const data = Object.assign({}, this.model);
      const originalModel = this.originalModel;
      for (const key in data) {
        if (data[key] === originalModel[key]) {
          delete data[key];
        }
      }
      if (Object.keys(data).length > 0) {
        await axios.put(`${this.src}/${this.id}`, data);
      }
      this.$refs.main.active = false;
      this.$emit('commit', data);
    }
  },
  props: {
    editing: Boolean
  }
};
