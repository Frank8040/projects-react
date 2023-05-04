import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0.5rem 1rem;
  background-color: #5a67d8;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

export const ButSvg = styled.div`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  color: #fff;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

export const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  position: relative;
  top: 0px;
  right: 0px;
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 1.2em;
  }

  @media (max-width: 400px) {
    font-size: 1em;
  }

  @media (max-width: 320px) {
    font-size: 0.8em;
  }
`;

export const LinkContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    align-items: center;
    flex-direction: row;
    justify-content: end;
  }
`;

export const LinkDiv = styled.div`
  align-items: center;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
  }
`;

export const Links = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 5px;
  border-left: 0.5rem solid #5a67d8;
  font-size: 1.125rem;
  font-weight: 500;
  color: #5a67d8;
  background-color: #edf2fb;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: #434190;
    background-color: #dbeafe;
    border-color: #434190;
  }

  @media (max-width: 600px) {
    font-size: 1em;
  }

  @media (max-width: 400px) {
    font-size: 0.8em;
  }
`;
