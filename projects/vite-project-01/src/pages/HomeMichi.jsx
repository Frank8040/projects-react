import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "../components/Square";
import { TURNS } from "../constants/constants.js";
import { checkWinnerFrom, checkEndGame } from "../logic/board";
import { WinnerModal } from "../components/Modal.jsx";
import { saveGameToStorage, resetGameStorage } from "../logic/storage/index.js";
import {
  Container,
  ResetGame,
  SectionGame,
  SectionTurn,
  Title,
} from "../styles/tictac";

function HomeMichi() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <Container>
      <Title>Juego de Michi</Title>
      <ResetGame onClick={resetGame}>Comenzar de nuevo</ResetGame>
      <SectionGame>
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </SectionGame>
      <SectionTurn>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </SectionTurn>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </Container>
  );
}

export default HomeMichi;
