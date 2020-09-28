import { makeStyles, Theme } from '@material-ui/core/styles'
import { userModel } from '@app/data'

export const drawerStyles = makeStyles((theme: Theme) => {
  const drawerWidth = userModel?.deviceType === 'mobile' ? '85%' : '250px'
  const breakDrawerWidth = 'sm'
  let extraBreakPoints = {
    shift: {
      [theme.breakpoints.down(breakDrawerWidth)]: {
        width: `calc(100% - 13%)`,
        marginLeft: '13%',
      },
    },
    drawer: {
      [theme.breakpoints.down(breakDrawerWidth)]: {
        width: `13%`,
      },
    },
  }

  return {
    root: {
      display: 'flex',
      overflowX: 'hidden',
      [theme.breakpoints.down(440)]: {
        overflowX: 'inherit',
      },
    },
    drawerItem: {
      paddingBottom: 10,
      paddingTop: 10,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        paddingBottom: 8,
        paddingTop: 8,
      },
    },
    absolute: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...extraBreakPoints.shift,
    },
    menuButton: {
      marginLeft: 2,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      flexDirection: 'column',
      overflowX: 'hidden',
      ...extraBreakPoints.drawer,
      paddingTop: theme.mixins.toolbar.minHeight,
    },
    drawerPaper: {
      width: drawerWidth,
      overflowX: 'hidden',
      ...extraBreakPoints.drawer,
    },
    drawerIconContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    toggleAlert: {
      flex: 1,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    alert: {
      [theme.breakpoints.down('sm')]: {
        color: theme.palette.primary.main,
      },
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflow: 'auto',
      [theme.breakpoints.down(breakDrawerWidth)]: {
        marginLeft: `-13%`,
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1) - 3,
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      overflow: 'inherit',
    },
    title: {
      color: 'rgba(255, 255, 255, 0.85)',
      letterSpacing: '.12rem',
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    flex: {
      flex: 1,
    },
    menuRoot: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    menuTitle: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    topList: {
      paddingLeft: 20,
      [theme.breakpoints.down(420)]: {
        paddingLeft: 15,
      },
    },
  }
})
