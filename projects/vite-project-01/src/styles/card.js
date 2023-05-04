import styled from "styled-components";

export const Article = styled.article`
  display: flex;
  margin: auto;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  justify-content: space-between;
  padding-bottom: 1rem;
  width: 400px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 1000px;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const UserName = styled.span`
  opacity: 0.6;
`;

export const Aside = styled.aside`
  display: flex;
  justify-content: start;
  align-items: start;
  align-content: start;
`;
