import * as fs from 'fs';

interface LotteryDraw {
  contest: number;
  date: string;
  numbers: number[];
}

interface BetResult {
  contest: number;
  date: string;
  matchingNumbers: number[];
  matchCount: number;
  winLevel: string;
}

class MegaSenaChecker {
  private draws: LotteryDraw[];

  constructor(csvFilePath: string) {
    this.draws = this.parseCSV(csvFilePath);
  }

  private parseCSV(filePath: string): LotteryDraw[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    const draws: LotteryDraw[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const columns = line.split(';');
      
      if (columns.length >= 8) {
        const contest = parseInt(columns[0]);
        const date = columns[1];
        const numbers = [
          parseInt(columns[2]),
          parseInt(columns[3]),
          parseInt(columns[4]),
          parseInt(columns[5]),
          parseInt(columns[6]),
          parseInt(columns[7])
        ].sort((a, b) => a - b);
        
        draws.push({ contest, date, numbers });
      }
    }
    
    return draws;
  }

  private getWinLevel(matchCount: number): string {
    switch (matchCount) {
      case 6: return 'Sena (6 numbers)';
      case 5: return 'Quina (5 numbers)';
      case 4: return 'Quadra (4 numbers)';
      default: return 'No prize';
    }
  }

  private findMatchingNumbers(betNumbers: number[], drawnNumbers: number[]): number[] {
    const betSet = new Set(betNumbers);
    return drawnNumbers.filter(num => betSet.has(num));
  }

  checkBet(betNumbers: number[]): BetResult[] {
    if (betNumbers.length !== 6) {
      throw new Error('Bet must contain exactly 6 numbers');
    }
    
    if (betNumbers.some(num => num < 1 || num > 60)) {
      throw new Error('Numbers must be between 1 and 60');
    }
    
    const sortedBet = [...betNumbers].sort((a, b) => a - b);
    const results: BetResult[] = [];
    
    for (const draw of this.draws) {
      const matchingNumbers = this.findMatchingNumbers(sortedBet, draw.numbers);
      const matchCount = matchingNumbers.length;
      
      if (matchCount >= 4) {
        results.push({
          contest: draw.contest,
          date: draw.date,
          matchingNumbers,
          matchCount,
          winLevel: this.getWinLevel(matchCount)
        });
      }
    }
    
    return results.sort((a, b) => b.contest - a.contest);
  }

  getTotalDraws(): number {
    return this.draws.length;
  }
}

export { MegaSenaChecker, LotteryDraw, BetResult };