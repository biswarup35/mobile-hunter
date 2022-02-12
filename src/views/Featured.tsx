import { Card, CardContainer, CardImage, Grid } from "../components";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import { Link } from "react-router-dom";

const POSTS = gql`
  query {
    articles(where: { is_featured: true }, limit: 3) {
      id
      title
      updated_at
      slug
      cover {
        url
        alternativeText
      }
      author {
        name
      }
    }
  }
`;

const Featured = () => {
  const { data, loading } = useQuery(POSTS);

  if (loading || !data) return null;
  return (
    <div>
      <div className="my-1">
        <h2>Featured</h2>
      </div>
      <Grid container gap={2}>
        {data.articles.map((article: any) => (
          <Grid key={article.id} item xs={12} sm={6} md={4}>
            <Link to={`/${article.slug}`}>
              <Card className="bg-primary full-height">
                <CardImage
                  src={`${process.env.REACT_APP_BLOG_URL}${article.cover.url}`}
                  alt={article.cover.alternativeText}
                />
                <CardContainer>
                  <div className="my-1">
                    <h5 style={{ color: "gray" }}>{`By ${
                      article.author.name
                    } - ${moment(article.updated_at)
                      .startOf("seconds")
                      .fromNow()}`}</h5>
                  </div>
                  <h4>{article.title}</h4>
                </CardContainer>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Featured;
