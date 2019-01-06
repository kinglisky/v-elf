<template>
  <elf-shell v-bind="$attrs" :class="className">
    <elf-base v-if="title || content"
      :title="title" :content="content">
    </elf-base>
    <component
      v-if="customComponent"
      v-bind="customProps"
      v-on="customListeners"
      :is="customRender">
    </component>
    <div ref="wrap"></div>
  </elf-shell>
</template>

<script>
import ElfShell from './shell'
import ElfBase from './base'
export default {
  name: 'VElfBody',

  components: { ElfShell, ElfBase },

  props: {
    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    className: {
      type: [String, Array],
      default: ''
    },

    // 对应 <component> 组件 is 属性
    customComponent: {
      type: [String, Function, Object],
      default: ''
    },

    // 自定义父级作用域名 vnode 节点
    customRef: {
      type: [String, Object],
      default: ''
    },

    // 工具函数调用时附加到自定义组件 props 上面的
    customProps: {
      type: Object,
      default () {
        return {}
      }
    },

    // 用于监听自定义组件 emit 的事件
    customListeners: Object
  },

  computed: {
    customRender () {
      const { customComponent } = this
      if (typeof customComponent === 'function') {
        return { render: customComponent }
      }
      return customComponent
    }
  },

  watch: {
    customRef: 'renderCustomNode'
  },

  methods: {
    renderCustomNode () {
      const { customRef, $parent, $refs } = this
      if (!customRef) return
      let ref = customRef
      if (typeof customRef === 'string' && $parent) {
        ref = $parent.$refs[customRef]
      }
      if (!ref) return
      const el = ref.$el || ref
      const childs = [...$refs.wrap.childNodes]
      childs.forEach(child => {
        $refs.wrap.removeChild(child)
      })
      $refs.wrap.appendChild(el)
    }
  },

  mounted () {
    this.renderCustomNode()
  }
}
</script>

<style scoped lang="scss">
.v-elf-body {
  position: relative;
  box-sizing: border-box;
  padding: 6px 8px;
  margin: 0;
  font-size: 12px;
  // transition: opacity .3s;
  // will-change: opacity, transform;

  &__title,
  &__content {
    padding: 0;
    margin: 0;
    text-align: left;
  }

  &__title {
    font-size: 14px;
    font-weight: 400;
  }

  &__content {
    overflow-y: auto;
    line-height: 2;
    text-align: left;
    word-wrap: break-word;
    background-color: inherit;
  }
}
</style>
