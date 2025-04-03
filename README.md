# Steps to Create a Tic-Tac-Toe Game using React

## 1. Initialize the Board Component

- Create a `Board` component that will hold the game logic and UI.
- Define the state variables:
  - `squares`: A 3x3 grid initialized with `-1` to represent empty cells.
  - `movesHistory`: An array to track moves played.
  - `player1Symbol`: A string to store Player 1's chosen symbol ('X' or 'O').
  - `isPlayer1`: A boolean to track whose turn it is.
  - `gameStatus`: A string to display the current game status.
  - `gameStarted`: A boolean to track whether the game has started.

## 2. Create the `Square` Component

- This component represents an individual cell in the Tic-Tac-Toe board.
- Accepts props:
  - `value`: The symbol ('X' or 'O') displayed in the square.
  - `handleSquareClick`: A function to handle clicks.
  - `gameOver`: A boolean to disable further clicks after the game is won.
- Uses Tailwind CSS for styling with hover effects and dynamic colors.

## 3. Define the Winning Combinations

- Store an array of all possible winning combinations using a `useRef`.
- Each combination contains three coordinates representing winning positions.

## 4. Generate the 3x3 Grid using a Helper Function

- `generate2DArray`: Creates a 3x3 grid initialized with `-1`.
- This function is memoized using `useCallback` to avoid unnecessary re-renders.

## 5. Handle Symbol Selection

- `chooseMark(mark)`: Allows Player 1 to select either 'X' or 'O' before starting the game.
- Prevents selection if the game has already started.

## 6. Handle Square Clicks

- `handleSquareClick({ outerIndex, innerIndex })`:
  - Prevents moves if a symbol is not selected or if the clicked cell is not empty.
  - Updates `squares` with the correct symbol based on the turn.
  - Updates `movesHistory`.
  - Switches the turn by toggling `isPlayer1`.

## 7. Check for a Winner

- `gameOver()`: Loops through `winCombos` to check if any player has won.
- `checkWinner()`: Updates `gameStatus` with the winner or next player's turn.

## 8. Update Game Status

- Uses `useEffect` to monitor changes in `squares` and update `gameStatus` accordingly.

## 9. Reset the Game

- `resetGame()`: Resets all state variables to their initial values, allowing a new game to start.

## 10. Render the UI

- Display the game title.
- Allow Player 1 to choose a symbol.
- Display the game status.
- Render the 3x3 grid using the `Square` component.
- Provide a "Reset Game" button to restart the game.

## 11. How the Game Works Code-wise

1. **Game Initialization**
   - The `Board` component initializes the game state with an empty 3x3 grid and player selection options.
   - The game does not start until Player 1 selects either 'X' or 'O'.

2. **Handling User Interactions**
   - Clicking on a square updates the `squares` state with the current player's symbol.
   - The turn alternates between Player 1 and Player 2 after every move.

3. **Checking for a Winner**
   - After every move, the `gameOver` function iterates over the predefined winning combinations.
   - If a winning condition is met, the game status updates to declare the winner.

4. **State Management and Effects**
   - `useEffect` listens for changes in the `squares` state and updates the game status accordingly.
   - If the board is full without a winner, the game results in a draw.

5. **Restarting the Game**
   - Clicking the "Reset Game" button clears the board and resets all states, allowing a new game to start from scratch.
