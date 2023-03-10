import { Container, Grid } from '@mui/material';
import Audiences from '../components/Audiences/Audiences';
import Header from '../components/Header/Header';

function Home() {
  return (
    <div className="App">
      <Container maxWidth={false} disableGutters={true}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
            <br></br>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="lg">
              <Audiences />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
