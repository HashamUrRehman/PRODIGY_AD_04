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
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#161929', 
  padding: 20,
},
title: {
  fontSize: 42,
  fontWeight: 'bold',
  color: '#FFD700', 
  marginBottom: 50,
  textShadowColor: '#333', 
  textShadowOffset: { width: 0, height: 8 },
  textShadowRadius: 4,
},
board: {
  width: 290, 
  height: 300,
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderColor: '#FFD700',
  borderWidth: 2,
  borderRadius: 10, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  backgroundColor: '#2C2C34', 
},
cell: {
  width: '33.33%',
  height: '33.33%',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FFD700', 
},
cellText: {
  fontSize: 40, 
  color: '#FFFFFF',
  textShadowColor: '#555', 
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
},
winnerText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FFD700',
  marginVertical: 40,
  textShadowColor: '#333',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
},
resetButton: {
  backgroundColor: '#FFD700', 
  paddingVertical: 15, 
  paddingHorizontal: 50,
  borderRadius: 12,
  marginTop: 100,
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},
resetButtonText: {
  color: '#000', 
  fontSize: 28,
  fontWeight: '700', 
  textAlign: 'center',
},
});
