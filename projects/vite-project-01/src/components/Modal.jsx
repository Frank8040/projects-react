/* eslint-disable react/prop-types */
import { Buttons, Footer, Header, Section, TextContainer, Title } from '../styles/modal.js'
import { Square } from './Square.jsx'

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó:'

  return (
    <Section>
      <TextContainer>
        <Title>{winnerText}</Title>
        <Header>
          {winner && <Square>{winner}</Square>}
        </Header>
        <Footer>
          <Buttons onClick={resetGame}>Empezar de nuevo</Buttons>
        </Footer>
      </TextContainer>
    </Section>
  )
}