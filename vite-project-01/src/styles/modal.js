import styled from "styled-components";
import Button from "../components/Button";

export const Buttons = styled(Button)`
  cursor: pointer;
  padding: 5px;
`;

export const Section = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Header = styled.header`
  margin: 0 auto;
  width: fit-content;
  border: 2px solid #eee;
  border-radius: 10px;
  display: flex;
  gap: 15px;
`;

export const TextContainer = styled.div`
  background: #111;
  height: 300px;
  width: 320px;
  border: 2px solid #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.h2`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-top: 1px;
  margin-bottom: 1px;
`;

export const Footer = styled.footer``;
