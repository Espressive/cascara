export const inputLabelStyles = {
  root: ({ props: p, variables: v }) => ({
    display: 'block',
    transition: 'all .2s',
    lineHeight: v.lineHeight,
    marginBottom: v.marginBottom,

    ...(p.labelPosition === 'inside' && {
      bottom: v.insideLabelBottom,
      top: 0,
      left: 0,
      margin: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      paddingLeft: v.insideLabelPaddingLeft,
      ...(p.hasValue && {
        transform: 'translateY(-16px)',
        fontSize: v.insideLabelActiveFontSize,
      }),
    }),
    ...(p.labelPosition === 'inline' && {
      paddingRight: v.inlineLabelPaddingRight,
    }),
    ...(p.required && {
      '::after': {
        content: '"*"',
      },
    }),
  }),
};
