import MarkdownToJSX from "markdown-to-jsx";

const Image = (props: any) => (
  <img
    src={`${process.env.REACT_APP_BLOG_URL}${props.src}`}
    alt={props.alt}
    style={{ width: "100%", objectFit: "cover", borderRadius: "4px" }}
    height="360px"
    width="600px"
  />
);

const Markdown = (props: any) => {
  return (
    <MarkdownToJSX
      options={{
        overrides: {
          img: {
            component: Image,
          },
        },
        wrapper: "article",
      }}
      {...props}
    />
  );
};
export default Markdown;
