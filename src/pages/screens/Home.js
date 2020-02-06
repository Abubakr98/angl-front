import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getData } from "../auth/fetchData";
import URL from "../../urls";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));
const cards = [1, 2, 3];
function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    getData(`${URL.base + URL.api + URL.groups}`, "GET").then(data => {
      props.setGroups(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.groups.length !== 0
              ? props.groups.map(gr => (
                  <Grid item key={gr.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {gr.name}
                        </Typography>
                        <Typography>{gr.des}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Вивчати
                        </Button>
                        <Button size="small" color="primary">
                          Додати
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : cards.map((el, i) => {
                  return (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <Skeleton
                          variant="rect"
                          className={classes.cardMedia}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            <Skeleton variant="rect" />
                          </Typography>
                          <Typography>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            <Skeleton variant="text" />
                          </Button>
                          <Button size="small" color="primary">
                            <Skeleton variant="text" />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
const mapState = state => {
  return {
    groups: state.groups
  };
};

const mapDispatch = ({ groups: { setGroups } }) => ({
  setGroups: data => setGroups(data)
});
export default connect(mapState, mapDispatch)(Home);
