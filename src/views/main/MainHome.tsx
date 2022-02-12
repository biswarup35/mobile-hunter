import { Card, CardContainer, Stack, CardImage } from "../../components";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import { Link } from "react-router-dom";
import { Loading } from "..";

const POSTS = (limit: number) => gql`
    query {
        articles(limit: ${limit}, ) {
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

const MainHome = () => {
  const { data, loading } = useQuery(POSTS(10));

  if (loading || !data) return <Loading />;
  return (
    <Stack className="my-2" gap={2}>
      <h2>News</h2>
      {data.articles.map((article: any) => (
        <Link key={article.id} to={`/${article.slug}`}>
          <Card className="bg-primary">
            <Stack direction="row">
              <CardImage
                style={{
                  width: "35%",
                }}
                src={`${process.env.REACT_APP_BLOG_URL}${article.cover.url}`}
                alt={article.cover.alternativeText}
              />
              <CardContainer>
                <h4>{article.title}</h4>
                <div className="my-1">
                  <h5 style={{ color: "gray" }}>{`By ${
                    article.author.name
                  } - ${moment(article.updated_at)
                    .startOf("seconds")
                    .fromNow()}`}</h5>
                </div>
              </CardContainer>
            </Stack>
          </Card>
        </Link>
      ))}
    </Stack>
  );
};

export default MainHome;
