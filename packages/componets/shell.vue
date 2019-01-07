<template>
  <div class="v-elf-shell" :x-placement="placement" :style="shellStyle">
    <slot></slot>
    <div class="v-elf-arrow" :style="arrowWrapStyle">
      <span class="v-elf-arrow__mask" :style="arrowMaskStyle"></span>
    </div>
  </div>
</template>

<script>
const THEME = {
  light: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    color: '#333'
  },

  dark: {
    backgroundColor: '#1f2d3d',
    borderColor: '#1f2d3d',
    color: '#fff'
  }
}

export default {
  name: 'vElfShell',

  props: {
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
    }
  },

  computed: {
    shellStyle () {
      const { theme, themeConf } = this
      const options = THEME[theme] || THEME.light
      return Object.assign({}, options, themeConf)
    },

    arrowWrapStyle () {
      return {
        borderWidth: `${this.arrowSize}px`
      }
    },

    arrowMaskStyle () {
      const { placement, shellStyle } = this
      const mainPlacement = placement.split('-')[0]
      const offset = ~['top', 'left'].indexOf(mainPlacement) ? '-2px' : '2px'
      const direction = ~['top', 'bottom'].indexOf(mainPlacement) ? 'top' : 'left'
      return {
        [direction]: offset,
        [`border-${mainPlacement}-color`]: shellStyle.backgroundColor
      }
    }
  }
}
</script>

<style lang="scss">
.v-elf-shell {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  color: #333;
  font-size: 12px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .1);
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  .v-elf-arrow {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    border-color: transparent;
    border-style: inherit;
    border-width: 10px;

    &__mask {
      content: "";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: inherit;
      border-width: inherit;
      transform: translate(-50%, -50%);
    }
  }

  &[x-placement^="top"] .v-elf-arrow {
    top: 100%;
    left: 50%;
    border-top-color: inherit;
    transform: translate(-50%, 0);
  }

  &[x-placement^="bottom"] .v-elf-arrow {
    top: 0;
    left: 50%;
    border-bottom-color: inherit;
    transform: translate(-50%, -100%);
  }

  &[x-placement^="left"] .v-elf-arrow {
    top: 50%;
    left: 100%;
    border-left-color: inherit;
    transform: translate(0, -50%);
  }

  &[x-placement^="right"] .v-elf-arrow {
    top: 50%;
    left: 0;
    border-right-color: inherit;
    transform: translate(-100%, -50%);
  }
}
</style>
