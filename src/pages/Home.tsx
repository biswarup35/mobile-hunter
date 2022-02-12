import { Container, Grid } from "../components";
import { Featured, Sidebar, MainHome } from "../views";

const Home = () => {
  return (
    <Container className="my-2">
      <Featured />
      <Grid container gap={2}>
        <Grid item xs={12} md={7} lg={8}>
          <MainHome />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
