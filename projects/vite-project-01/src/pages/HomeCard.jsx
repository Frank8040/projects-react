import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  background-color: gray;
`;

const SubContainer = styled.div`
  padding-top: 1rem;
  margin: auto;
  text-align: center;
  height: auto;
`

const HomeCard = () => {
  return (
    <Container>
      <SubContainer>
        <Card userName="Reyna7729" name="Reyna Mamani Blanco" />
        <Card userName="Efraín7729" name="Efraín Chunca Laura" />
        <Card userName="Frank7729" name="Frank Chunca Mamani" />
        <Card userName="Manuel7729" name="Manuel Chunca Mamani" />
        <Card userName="Luis7729" name="Luis Sandro Chunca Mamani" />
      </SubContainer>
    </Container>
  );
};

export default HomeCard;
