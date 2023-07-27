import { useState } from "react";
import { ButSvg, Button, LinkContainer, LinkDiv, Links, NavContainer, Svg, Title } from "../styles/navigation";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <NavContainer>
      <ButSvg>
        <Button onClick={() => setOpen(!open)}>
          <Svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" />
          </Svg>
        </Button>
      </ButSvg>
      <LinkContainer>
        <LinkDiv open={open}>
          <Links to="/">
            Tarjetas
          </Links>
          <Links to="/nosotros">
            Juego Michi
          </Links>
          <Links to="/categoria">
            Buscar Películas
          </Links>
        </LinkDiv>
        <Title>Mi Sitio</Title>
      </LinkContainer>
    </NavContainer>
  );
}

export default Navigation;