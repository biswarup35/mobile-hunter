import { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Drawer,
  Stack,
  Toolbar,
} from "../../components";
import { useMediaQuery } from "../../hooks";
import { MenuIcon } from "../../icons";
import Logo from "../../Logo";

const Navbar = () => {
  const sm = useMediaQuery("sm-down");
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  return (
    <Fragment>
      <AppBar color="primary">
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <Link style={{ flexGrow: 1 }} to="/">
              <Logo />
            </Link>
            {sm && (
              <div
                onClick={() => {
                  setOpen(true);
                }}
              >
                <MenuIcon />
              </div>
            )}
            {!sm && (
              <Stack direction="row">
                <Link to="/">
                  <Button className="bg-tertiary px-2 py-1 radius-1 pointer">
                    News
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="bg-tertiary px-2 py-1 radius-1 pointer">
                    About
                  </Button>
                </Link>
                <Link to="/privacy">
                  <Button className="bg-tertiary px-2 py-1 radius-1 pointer">
                    Privacy
                  </Button>
                </Link>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer className="bg-main" onOpen={open}>
        <Stack className="mx-2 my-2">
          <Button
            onClick={handleClose}
            className="bg-tertiary px-2 py-1 radius-1 pointer my-3"
          >
            close
          </Button>
          <Link to="/">
            <Button
              onClick={handleClose}
              className="bg-tertiary px-2 py-1 radius-1 pointer full-width"
            >
              News
            </Button>
          </Link>
          <Link to="/about">
            <Button
              onClick={handleClose}
              className="bg-tertiary px-2 py-1 radius-1 pointer full-width"
            >
              About
            </Button>
          </Link>
          <Link to="/privacy">
            <Button
              onClick={handleClose}
              className="bg-tertiary px-2 py-1 radius-1 pointer full-width"
            >
              Privacy
            </Button>
          </Link>
        </Stack>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
