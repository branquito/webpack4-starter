<script>
import classnames from 'classnames'
export const UiGrid = {
  props: {
    columnGap: {
      default: 'm',
      type: String
    },
    rowGap: {
      default: 'm',
      type: String
    },
    tag: {
      default: 'div',
      type: String
    }
  },
  render() {
    const Tag = this.tag
    return (
      <Tag
        class={classnames(
          'grid',
          `grid--column-gap-${this.columnGap}`,
          `grid--row-gap-${this.rowGap}`
        )}>
        {this.$slots.default}
      </Tag>
    )
  }
}
export const UiGridItem = {
  props: {
    tag: {
      default: 'div',
      type: String
    },
    width: {
      default: () => [],
      type: Array
    }
  },
  render() {
    const Tag = this.tag
    return (
      <Tag
        class={classnames(
          'grid__item',
          this.width.map(x => `grid__item--width-${x}`)
        )}>
        this.$slots.default
      </Tag>
    )
  }
}
export default UiGrid
</script>
<style lang="scss">
$breakpoint-m: 32em;
$gap-m: 1em;
$gap-l: 2em;

.grid {
  display: flex;
  flex-wrap: wrap;

  &--column-gap-m {
    margin-left: -$gap-m;
  }

  &--column-gap-l {
    margin-left: -$gap-l;
  }

  &--row-gap-m {
    margin-top: -$gap-m;
  }

  &--row-gap-l {
    margin-top: -$gap-l;
  }
}

.grid__item {
  box-sizing: border-box;

  &--width-12\/12 {
    width: 100%;
  }

  @media (min-width: $breakpoint-m) {
    &--width-4\/12\@m {
      width: 33.3333333%;
    }

    &--width-8\/12\@m {
      width: 66.6666666%;
    }
  }

  .grid--column-gap-m > & {
    padding-left: $gap-m;
  }

  .grid--column-gap-l > & {
    padding-left: $gap-l;
  }

  .grid--row-gap-m > & {
    padding-top: $gap-m;
  }

  .grid--row-gap-l > & {
    padding-top: $gap-l;
  }
}
</style>
