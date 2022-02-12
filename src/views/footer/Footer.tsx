import { Stack } from "../../components";

const Footer = () => (
  <footer className="bg-primary py-1">
    <Stack alignItems="center">
      <p>{`Copyright © Mobile Hunter ${new Date().getFullYear()}.`}</p>
    </Stack>
  </footer>
);

export default Footer;
