# Mega-Sena Lottery Checker

A simple "vibecoded" TypeScript tool to check your lottery bet against the complete historical results of Brazil's Mega-Sena lottery (until 09/Dec/2025). Find out if your numbers would have been winners and when!

## Features

- ✅ Check any 6-number bet against **all historical Mega-Sena results** (2,949+ draws)
- 🏆 Detect all prize levels: **Sena** (6 matches), **Quina** (5 matches), **Quadra** (4 matches)
- 📅 Shows contest number, date, and exact matching numbers for each win
- ⚡ Fast CSV parsing and Set-based number matching
- 🛡️ Input validation (unique numbers, 1-60 range, exactly 6 numbers)
- 💻 Simple command-line interface

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd mega-sena-node
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure you have the historical data:**
   - The project requires `mega-sena.csv` with historical lottery results
   - CSV format: `Concurso;Data Sorteio;1a Dezena;2a Dezena;3a Dezena;4a Dezena;5a Dezena;6a Dezena;Ganhadores Sena`

## Usage

### Command Line Interface

Check your lottery bet by providing 6 numbers as command-line arguments:

```bash
npx ts-node example.ts <num1> <num2> <num3> <num4> <num5> <num6>
```

### Examples

**Check a specific bet:**
```bash
npx ts-node example.ts 6 11 4 49 54 38
```

**Sample output:**
```
Loaded 2949 historical draws

Checking bet: [6, 11, 4, 49, 54, 38]

This bet would have won 3 time(s):

1. Contest 2949 (09/12/2025)
   Sena (6 numbers)
   Matching numbers: [4, 6, 11, 38, 49, 54]

2. Contest 2378 (05/06/2021)
   Quadra (4 numbers)
   Matching numbers: [11, 38, 49, 54]

3. Contest 1656 (26/11/2014)
   Quadra (4 numbers)
   Matching numbers: [4, 6, 11, 54]
```

**Try different numbers:**
```bash
npx ts-node example.ts 1 15 23 35 44 59
```

### Input Validation

The tool validates your input and provides helpful error messages:

```bash
# Wrong number of arguments
npx ts-node example.ts 1 2 3 4 5
# Output: Usage: npx ts-node example.ts <num1> <num2> <num3> <num4> <num5> <num6>

# Invalid number range
npx ts-node example.ts 1 2 3 4 5 70
# Output: Error: Invalid number: 70. Numbers must be between 1 and 60.

# Duplicate numbers
npx ts-node example.ts 1 2 3 4 5 5
# Output: Error: All 6 numbers must be different.
```

## Programmatic Usage

You can also use the checker in your own TypeScript/JavaScript code:

```typescript
import { MegaSenaChecker } from './mega-sena-checker';

// Initialize the checker
const checker = new MegaSenaChecker('./mega-sena.csv');

// Check a bet
const results = checker.checkBet([6, 11, 4, 49, 54, 38]);

// Process results
if (results.length > 0) {
  console.log(`Your bet would have won ${results.length} times!`);
  
  results.forEach(result => {
    console.log(`Contest ${result.contest}: ${result.winLevel}`);
    console.log(`Matching numbers: [${result.matchingNumbers.join(', ')}]`);
  });
} else {
  console.log('This bet would never have won any prize.');
}

// Get total number of draws
console.log(`Total historical draws: ${checker.getTotalDraws()}`);
```

## API Reference

### Classes

#### `MegaSenaChecker`

Main class for checking lottery bets against historical data.

**Constructor:**
- `new MegaSenaChecker(csvFilePath: string)` - Initialize with path to CSV file

**Methods:**
- `checkBet(betNumbers: number[]): BetResult[]` - Check a 6-number bet
- `getTotalDraws(): number` - Get total number of historical draws loaded

### Interfaces

#### `BetResult`
```typescript
interface BetResult {
  contest: number;        // Contest number
  date: string;          // Draw date (DD/MM/YYYY)
  matchingNumbers: number[]; // Numbers that matched
  matchCount: number;    // How many numbers matched (4, 5, or 6)
  winLevel: string;      // Prize level description
}
```

#### `LotteryDraw`
```typescript
interface LotteryDraw {
  contest: number;       // Contest number
  date: string;         // Draw date
  numbers: number[];    // The 6 winning numbers (sorted)
}
```

## Prize Levels

- **Sena**: 6 matching numbers (jackpot)
- **Quina**: 5 matching numbers 
- **Quadra**: 4 matching numbers
- **No prize**: Less than 4 matching numbers

## Data Format

The CSV file should contain historical Mega-Sena results in this format:
```
Concurso;Data Sorteio;1a Dezena;2a Dezena;3a Dezena;4a Dezena;5a Dezena;6a Dezena;Ganhadores Sena
2949;09/12/2025;6;11;4;49;54;38;0
2948;06/12/2025;37;58;6;52;24;53;0
...
```

## Development

### Build
```bash
npx tsc
```

### Run Tests
```bash
# Compile check
npx tsc --noEmit

# Test with sample data
npx ts-node example.ts 6 11 4 49 54 38
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Disclaimer

This tool is for entertainment and educational purposes only. Past lottery results do not predict future outcomes. Please gamble responsibly.

---

**Vibecoded with IA** 🤖