import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'fixed',
    top: 'calc(50vh - 50px)',
    left: 'calc(50vw - 50px)'
  },
}));

export default useStyles;
