import { makeStyles, Theme } from '@material-ui/core/styles'

const containerPadding = { paddingLeft: 12, paddingRight: 10 }
interface MergedTheme extends Theme {
  color: any
}
export const issueFeedStyles = makeStyles((theme: MergedTheme) => ({
  root: {
    position: 'fixed',
    right: 0,
    top: 65,
    bottom: 0,
    width: '20vw',
    minWidth: 260,
    borderLeft: `1px solid ${theme.color.border}`,
    backgroundColor: theme.palette.background.default,
    overflowY: 'scroll',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    flex: 1,
  },
  list: {
    overflowX: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
  },
  searchList: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingBottom: 0,
    display: 'block',
    maxHeight: '60vh',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '25vh',
    },
    paddingTop: 0,
  },
  checklist: {
    maxHeight: 'none',
    overflowY: 'hidden',
  },
  subTitle: {
    ...containerPadding,
    borderBottom: `1px solid ${theme.color.border}`,
  },
  row: {
    display: 'flex',
    borderBottom: `1px solid ${theme.color.border}`,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },
  titleContainer: containerPadding,
  print: {
    marginTop: 16,
  },
}))
