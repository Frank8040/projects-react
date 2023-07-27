import styled from "styled-components";

export const Container = styled.div`
  background-color: gray;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  max-width: 800px;
  height: auto;
`;
export const Header = styled.header``;
export const Title = styled.h1``;

export const Form = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Input = styled.input`
  outline: none;
  border-radius: 10px;
  padding: 8px;
  border: 1px solid transparent;
  border-color: ${(props) => (props.error ? "red" : "transparent")};
`;

export const CheckBox = styled.input`
  cursor: pointer;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 4px 10px 4px 10px;
  background-color: #ddd;
  color: #808088;
  font-weight: 700;
  border: none;
  font-size: 1rem;
  border-radius: 10px;

  &:hover {
    background-color: blue;
    color: white;
    font-weight: 700;
  }
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  width: 100%;
  gap: 1px;
`;

export const Li = styled.li`
  text-align: center;
  margin: auto;
`;

export const TitleMovie = styled.h3`
  margin: 0;
`;
export const P = styled.h3`
  margin: 0;
`;

export const Image = styled.img`
  border-radius: 8px;
  margin-top: 16px;
  width: 240px;
`;
