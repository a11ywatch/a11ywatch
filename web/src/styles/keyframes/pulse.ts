import { makeStyles } from '@material-ui/core/styles'

const bounceAnimation = '$loader-bounce 2s infinite'

const effect = {
  animation: bounceAnimation,
}

const frame = {
  '0%': {
    transform: 'scale(0)',
    '-webkit-transform': 'scale(0)',
  },
  '100%': {
    transform: 'scale(0)',
    '-webkit-transform': 'scale(0)',
  },
  '50%': {
    transform: 'scale(1)',
    '-webkit-transform': 'scale(1)',
  },
}

export const pulseStyles = makeStyles(() => ({
  bounce: effect,
  bounce2: {
    '-webkit-animation-delay': '-1s',
    animationDelay: '-1s',
  },
  '@keyframes loader-bounce': frame,
}))
