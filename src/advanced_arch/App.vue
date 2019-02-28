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
export default UiGrid
</script>
