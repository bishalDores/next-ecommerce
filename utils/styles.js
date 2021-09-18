import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  main: {
    minHeight: "80vh",
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default useStyles;
