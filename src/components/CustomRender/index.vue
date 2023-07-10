<script lang="ts">
import { compile, VNode, defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    html: { type: String, required: true }
  },
  computed: {
    template(): string {
      return this.html;
    },
    style() {
      return this.html.match(/<style\b[^>]*>(.*?)<\/style>/s)?.[1] || "";
    }
  },
  render(): VNode {
    // create style sheet manually
    if (this.style) {
      const style = document.createElement('style');
      style.innerHTML = this.style;
      document.head.appendChild(style);
    }

    return h(compile(this.template));
  }
})
</script>