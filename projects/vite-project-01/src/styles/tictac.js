import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  width: fit-content;
  margin: auto;
  text-align: center;
`;
export const Title = styled.h1`
  color: #eee;
  margin-top: 1px;
  margin-bottom: 1px;
`;

export const ResetGame = styled.button`
  padding: 8px;
  margin: 10px auto 10px auto;
  background: transparent;
  border: 2px solid #eee;
  color: #eee;
  width: 100px;
  border-radius: 5px;
  transition: 0.2s;
  font-weight: bold;
  cursor: pointer;

  :hover {
    background: #eee;
    color: #222;
  }
`;

export const SectionGame = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const SectionTurn = styled.section`
  display: flex;
  justify-content: center;
  margin: 10px auto;
  width: fit-content;
  position: relative;
  border-radius: 10px;
`;
