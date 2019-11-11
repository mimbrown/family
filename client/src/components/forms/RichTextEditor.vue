<template>
  <div>
    <div></div>
    <Pictures v-model="images" @select="onImageSelect" />
  </div>
</template>

<script>
import Pictures from '../Pictures';

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  // ['blockquote', 'code-block'],
  // [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered'}, { list: 'bullet' }],
  // [{ script: 'sub'}, { script: 'super' }],
  [{ indent: '-1'}, { indent: '+1' }],
  // [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['image']
  // ['clean']
];

export default {
  components: {
    Pictures
  },
  inject: {
    form: { default: null }
  },
  created () {
    this.form && this.form.register(this);
  },
  beforeDestroy () {
    this.form && this.form.unregister(this);
  },
  name: 'RichTextEditor',
  mounted () {
    this.quill = new Quill(this.$el.firstChild, {
      modules: {
        toolbar
      },
      theme: 'snow'
    });
    this.quill.getModule('toolbar').addHandler('image', (value) => {
      this.quill._lastSelection = this.quill.getSelection();
      this.images = true;
    });
    if (this.value) {
      this.quill.pasteHTML(this.value)
    }
    this.quill.on('text-change', () => {
      let html = this.$el.querySelector('.ql-editor').innerHTML;
      const quill = this.quill
      const text = quill.getText()
      if (html === '<p><br></p>') html = ''
      this._content = html
      this.$emit('input', this._content)
      this.$emit('change', { html, text, quill })
    });
  },
  data () {
    return {
      images: false,
      quill: null
    };
  },
  methods: {
    onImageSelect (selection) {
      const { index } = this.quill._lastSelection;
      delete this.quill._lastSelection;
      this.quill.insertEmbed(index, 'image', selection.src);
    },
    reset () {
      this.quill.setText('');
    }
  },
  props: {
    value: String
  },
  watch: {
    value (value) {
      if (this.quill) {
        if (value && value !== this._content) {
          this._content = value
          this.quill.pasteHTML(value)
        } else if (!value) {
          this.quill.setText('')
        }
      }
    }
  }
}
</script>

<style>
.ql-editor img {
  width: 300px;
  max-width: 50% !important;
  border-radius: 5px;
}
.ql-editor img:nth-of-type(odd) {
  float: right;
  margin-left: 15px;
  transform: rotate(5deg);
}
.ql-editor img:nth-of-type(even) {
  float: left;
  margin-right: 15px;
  transform: rotate(-5deg);
}
</style>
