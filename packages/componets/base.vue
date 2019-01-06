<template functional>
  <div class="v-elf-base">
    <h3 class="v-elf-base__title" v-if="props.title">{{ props.title }}</h3>
    <p class="v-elf-base__content" v-if="props.content">{{ props.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.v-elf-base {
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
