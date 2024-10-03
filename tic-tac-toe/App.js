import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const initialBoard = Array(9).fill(null);

export default function App() {
  const [board, setBoard] = useState(initialBoard); // Tic Tac Toe board
  const [isXNext, setIsXNext] = useState(true); // Track current player (X or O)
  const [winner, setWinner] = useState(null); // Store the winner

  const handlePress = (index) => {
    if (board[index] || winner) return; // Ignore if already marked or game won

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (newBoard.every(cell => cell)) setWinner('Draw'); // If board is full and no winner
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {winner && (
        <Text style={styles.winnerText}>
          {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
        </Text>
      )}

      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: 'white', marginBottom: 60 },
  board: { width: 250, height: 250, flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  cellText: { fontSize: 36, color: 'white' },
  winnerText: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginVertical: 30 },
  resetButton: { backgroundColor: 'white', adding:30, borderRadius: 10, marginTop: 130 },
  resetButtonText: { color: 'black', fontSize: 28, },
});
