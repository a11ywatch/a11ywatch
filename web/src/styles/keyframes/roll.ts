import { makeStyles } from '@material-ui/core/styles'

const rollAnimation = '$roll 10s ease 1s infinite'

const opacity = 0

const dup = {
  opacity,
  transform: 'translate3d(0,70%,0)',
}

const ddown = {
  opacity: 1,
  transform: 'translateZ(0)',
}

export const rollStyles = makeStyles((theme) => ({
  roll: {
    animation: rollAnimation,
  },
  d0: {
    '-webkit-animation-delay': '1s',
    animationDelay: '1s',
    opacity,
  },
  d1: {
    '-webkit-animation-delay': '3s',
    animationDelay: '3s',
    opacity,
  },
  d2: {
    '-webkit-animation-delay': '5s',
    animationDelay: '5s',
    opacity,
  },
  d3: {
    '-webkit-animation-delay': '7s',
    animationDelay: '7s',
    opacity,
  },
  d4: {
    '-webkit-animation-delay': '9s',
    animationDelay: '9s',
    opacity,
  },
  g: {
    display: 'grid',
    'grid-template-columns': '1fr',
    'grid-template-rows': '1fr',
    float: 'right',
    marginLeft: '0.8rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0.5rem',
    },
    [theme.breakpoints.down(600)]: {
      float: 'none',
      textAlign: 'center',
      marginRight: 0,
      marginLeft: 0,
    },
  },
  gi: {
    'grid-column': '1/-1',
    'grid-row': '1/-1',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  '@keyframes roll': {
    '0%': {
      opacity,
      transform: 'translate3d(0,-70%,0)',
    },
    '2.5%': ddown,
    '20%': ddown,
    '27.5%': dup,
    '100%': dup,
  },
}))
