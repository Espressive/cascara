export const dropdownSearchInputStyles = {
  root: ({ variables: v }) => ({
    flexBasis: v.comboboxFlexBasis,
    flexGrow: 1,
  }),

  input: ({ props: p }) => ({
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...(p.inline && {
      padding: 0,
      lineHeight: 'initial',
    }),
  }),
};
