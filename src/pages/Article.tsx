import { Helmet } from "react-helmet";
import moment from "moment";
import { Container, Divider, Grid, Stack } from "../components";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Sidebar, Markdown, Loading } from "../views";
import { CommentForm, Comments } from "../views";
import { useSnapshot } from "valtio";
import { commentBox } from "../App/comments";
import { useComments } from "../hooks";

const post = (slug: string) => gql`
  query {
    articles (where: { slug: "${slug}" }) {
      id
      title
      excerpt
      content
      updated_at
      category {
        name
      }
      author {
        name
      }
      cover {
        url
        alternativeText
      }
    }
  }`;

const Article = () => {
  const { slug = "" } = useParams();
  const { data, loading } = useQuery(post(slug));

  const { show } = useSnapshot(commentBox);
  const { comments } = useComments(data?.articles[0]?.id);

  console.log(data?.articles[0]?.id);

  if (loading || !data) return <Loading />;
  return (
    <div>
      <Helmet>
        <title>{data.articles[0].title}</title>
        <meta name="description" content={data.articles[0].excerpt} />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content={data.articles[0].title} />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_BLOG_URL}${data.articles[0].cover.url}`}
        />
        <meta property="og:description" content={data.articles[0].excerpt} />
        <meta property="og:site_name" content="Mobile Hunter" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:title" content="Content Title" />
        <meta name="twitter:description" content={data.articles[0].excerpt} />
        <meta
          name="twitter:image"
          content={`${process.env.REACT_APP_BLOG_URL}${data.articles[0].cover.url}`}
        />
      </Helmet>
      <Container className="my-2" maxWidth="lg">
        <Stack>
          <h1>{data.articles[0].title}</h1>
          <p style={{ fontStyle: "italic", color: "gray" }}>
            {data.articles[0].excerpt}
          </p>
          <div className="my-1">
            <h5>{`By ${data.articles[0].author.name} - ${moment(
              data.articles[0].updated_at
            )
              .startOf("seconds")
              .fromNow()}`}</h5>
          </div>
          <Divider />
        </Stack>
      </Container>
      <Container className="my-2" maxWidth="lg">
        <Grid container gap={2}>
          <Grid item xs={12} md={7}>
            <img
              className="my-2"
              style={{ width: "100%", borderRadius: "4px", objectFit: "cover" }}
              width="600px"
              height="360px"
              src={`${process.env.REACT_APP_BLOG_URL}${data.articles[0].cover.url}`}
              alt={data.articles[0].cover.alternativeText}
            />
            <Markdown>{data.articles[0].content}</Markdown>
            <Divider />
          </Grid>
          <Grid item xs={12} md={5}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
      <Container className="my-2" maxWidth="lg">
        <h4 className="py-2">{`Comments (${comments.length ?? 0})`}</h4>
        {show && (
          <div className="my-2">
            <CommentForm parentId={data?.articles[0]?.id} />
          </div>
        )}
        <Comments data={comments} />
      </Container>
    </div>
  );
};

export default Article;
