import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

const AppView: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        쿠플라이 어드민 대시보드
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Visits" total={714000} color="success" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="새로운 회원가입자 수" total={1352831} color="info" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="새로운 모의지원자 수" total={1723315} color="warning" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Bug Reports" total={234} color="error" />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30].map((value, index) => ({
                    x: `01/0${index + 1}/2003`, // example x value, adjust as needed
                    y: value,
                  })),
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43].map((value, index) => ({
                    x: `01/0${index + 1}/2003`, // example x value, adjust as needed
                    y: value,
                  })),
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39].map((value, index) => ({
                    x: `01/0${index + 1}/2003`, // example x value, adjust as needed
                    y: value,
                  })),
                },
              ],
              colors: ['#FF4560', '#00E396', '#008FFB'], // Example colors
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
              colors: ['#FF4560', '#00E396', '#008FFB'], // Example colors
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppView;
