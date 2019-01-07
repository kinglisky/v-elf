<template>
  <transition name="v-elf-fade">
    <elf-shell
      v-show="visiable"
      :theme="theme"
      :theme-conf="themeConf"
      :placement="placement"
      :arrow-size="arrowSize"
      :class="className"
      class="v-elf-fade"
      ref="shell">
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
  </transition>
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

    placement: {
      type: String,
      default: 'top'
    },

    arrowSize: {
      type: Number,
      default: 8
    },

    theme: {
      type: String,
      default: 'light'
    },

    themeConf: {
      type: Object,
      default: () => ({})
    },

    // 对应 <component> 组件 is 属性
    customComponent: {
      type: [String, Function, Object],
      default: ''
    },

    // 自定义父级作用域名 vnode 节点
    customRef: {
      type: Object,
      default: () => (null)
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

  data () {
    return {
      visiable: false
    }
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
      const { customRef, $refs } = this
      if (!customRef) return
      const el = customRef.$el || customRef
      const childs = [...$refs.wrap.childNodes]
      childs.forEach(child => {
        $refs.wrap.removeChild(child)
      })
      $refs.wrap.appendChild(el)
    },

    initMounted () {
      const { shell } = this.$refs
      this.visiable = false
      if (shell && shell.$el) {
        document.body.appendChild(shell.$el)
      }
    }
  },

  mounted () {
    this.initMounted()
    this.renderCustomNode()
  }
}
</script>

<style scoped lang="scss">
.v-elf-fade {
  opacity: 1;
  transition: opacity .3s;
  will-change: opacity, transform;

  &-enter,
  &-leave-active {
    opacity: 0;
  }
}
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
