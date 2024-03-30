const breakpoints = [
  '599px', // phone
  '768px', // miniTablet
  '1024px', // tablet
  '1440px', // desktop
  '1800px', // wide
  '2400px', // ultraWide
]

export const theme = {
  borderRadius: '3px',
  borderRadiusMessage: '4px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  inputBoxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.1)',
  boxShadowOnHover: '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
  colors: {
    white: '#ffffff',
    black: '#000',
    formBackground: '#f2f4f5',
    borderColor: '#cb7d00',
    placeholder: '#9d9d9d',
    input: '#1068b2;',
    inputDefaultBorder: '#ccc',
    success: '#05b905',
    successBackground: 'rgba(5, 185, 5, 0.1)',
    danger: '#bb2124',
    dangerBackground: 'rgba(187, 33, 36, 0.1)'
  },
  breakpoints,
  mediaQueries: {
    phone: `@media screen and (max-width: ${breakpoints[0]})`,
    miniTablet: `@media screen and (min-width: ${breakpoints[0]}) and (max-width: ${breakpoints[1]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]}) and (max-width: ${breakpoints[2]})`,
    laptop: `@media screen and (min-width: ${breakpoints[2]}) and (max-width: ${breakpoints[3]})`,
    desktop: `@media screen and (min-width: ${breakpoints[3]}) and (max-width: ${breakpoints[4]})`,
    wide: `@media screen and (min-width: ${breakpoints[4]}) and (max-width: ${breakpoints[5]})`,
    ultraWide: `@media screen and (min-width: ${breakpoints[5]})`,
  }
}
