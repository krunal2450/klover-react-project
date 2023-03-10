import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';

function AudienceDetails() {
  const { id } = useParams();
  const [audience, setAudience] = useState<any[]>([]);
  const currentItem = audience.find((x: any) => x.id === id);
  console.log(currentItem);

  useEffect(() => {
    fetchAudienceData();
  }, []);

  const fetchAudienceData = async () => {
    return fetch("http://localhost:3000/audiences")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAudience(data);
      })
  }

  return (
    <div className="App">
      <Container maxWidth={false} disableGutters={true}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
            <br></br>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {currentItem?.name}
                  </Typography>
                  <Divider variant="middle" />
                  <br />
                  <Typography variant="h6" gutterBottom>
                    Dimensions
                  </Typography>
                  <Grid container spacing={2}>
                    {currentItem?.dimensions?.map((dim: any) =>
                      <Grid item xs={6}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1" gutterBottom>
                              {dim.type}
                            </Typography>
                            <Divider variant="middle" />
                            <br />
                            {dim.filters?.map((filter: string) =>
                              <Typography variant="body2" gutterBottom>
                                {filter}
                              </Typography>
                            )}
                            <br />
                            <Typography variant="body2" gutterBottom>
                                Size: {dim.size}
                              </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                  <br />
                  <Divider variant="middle" />
                  <br />
                  <Typography variant="h5">
                    Total Size: {currentItem?.totalSize}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AudienceDetails;
