import axios from 'axios';
import { deepClone, deepEqual } from '../../utils/ops';

export default {
  data () {
    return {
      id: null,
      originalModel: null,
      required: v => !!v || 'This field is required'
    };
  },
  methods: {
    activate (context) {
      this.$refs.main.active = true;
      if (context) {
        Object.assign(this, context);
        this.originalModel = deepClone(context.model);
      }
    },
    cancel (form) {
      this.finish(form);
    },
    finish (form) {
      this.$refs.main.active = false;
      form.reset();
    },
    async save (form) {
      const model = Object.assign({}, this.model);
      if (this.editing) {
        const originalModel = this.originalModel;
        for (const key in model) {
          if (deepEqual(model[key], originalModel[key])) {
            delete model[key];
          }
        }
        if (Object.keys(model).length > 0) {
          await axios.put(`${this.src}/${this.id}`, model);
          this.$emit('edited', model);
        }
      } else {
        const { data } = await axios.post(this.src, model);
        this.$emit('added', data);
      }
      this.finish(form);
    }
  },
  props: {
    editing: Boolean
  }
};
