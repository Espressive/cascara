export const avatarImageStyles = {
  root: ({ variables: v, props: p }) => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    ...(p.circular && { borderRadius: v.imageCircularRadius }),
    ...(p.avatar && {
      width: (p.fluid && '100%') || v.imageAvatarSize,
      borderRadius: v.imageAvatarRadius,
    }),
    borderColor: v.avatarBorderColor,
    borderStyle: 'solid',
    borderWidth: v.avatarBorderWidth,

    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'top',
    width: '100%',

    ...(!p.avatar && {
      borderRadius: v.squareAvatarBorderRadius,
    }),
  }),
};
