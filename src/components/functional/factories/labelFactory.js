const options = ctx => {
  return {
    style: {
      color: '#444'
    }
  }
}

const makeLabel = (ctx, h) => {
  const [, def] = ctx.control
  return h('p', [h('label', options(ctx), def.label)])
}

export default makeLabel