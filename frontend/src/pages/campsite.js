import React from "react"

import { withStyles } from "@material-ui/core/styles"
import { Grid, Paper, CssBaseline } from "@material-ui/core"

import Nav from "./campsite/nav"
import Overview from "./overview"

const styles = {
  main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
    fontFamily: "Roboto !important",
  },
  mainPaper: {
    padding: 0,
  },
}

const Campsite = ({ classes }) => (
  <div>
    <CssBaseline />
    <Nav />
    <Grid container spacing={16} className={classes.main}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Paper className={classes.mainPaper}>
          <Overview />
        </Paper>
      </Grid>
    </Grid>
  </div>
)

export default withStyles(styles)(Campsite)
