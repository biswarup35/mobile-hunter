import { Card, CardContainer, CardImage, Stack } from "../../components";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import { Link } from "react-router-dom";

const POSTS = gql`
  query {
    articles(limit: 5) {
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
const Sidebar = () => {
  const { data, loading } = useQuery(POSTS);
  if (loading || !data) return null;
  return (
    <Stack className="my-2" gap={2}>
      <h2>Recent Posts</h2>
      {data.articles.map((article: any) => (
        <Link key={article.id} to={`/${article.slug}`}>
          <Card className="bg-primary">
            <Stack direction="row">
              <CardImage
                style={{
                  width: "30%",
                }}
                src={`${process.env.REACT_APP_BLOG_URL}${article.cover.url}`}
                alt={article.cover.alternativeText}
              />
              <CardContainer>
                <h5>{article.title}</h5>
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
export default Sidebar;
