import { MegaSenaChecker } from './mega-sena-checker';

function main() {
  try {
    const args = process.argv.slice(2);
    
    if (args.length !== 6) {
      console.log('Usage: npx ts-node example.ts <num1> <num2> <num3> <num4> <num5> <num6>');
      console.log('Example: npx ts-node example.ts 6 11 4 49 54 38');
      process.exit(1);
    }
    
    const myBet = args.map(arg => {
      const num = parseInt(arg);
      if (isNaN(num) || num < 1 || num > 60) {
        throw new Error(`Invalid number: ${arg}. Numbers must be between 1 and 60.`);
      }
      return num;
    });
    
    if (new Set(myBet).size !== 6) {
      throw new Error('All 6 numbers must be different.');
    }
    
    const checker = new MegaSenaChecker('./mega-sena.csv');
    
    console.log(`Loaded ${checker.getTotalDraws()} historical draws`);
    console.log(`\nChecking bet: [${myBet.join(', ')}]`);
    
    const results = checker.checkBet(myBet);
    
    if (results.length === 0) {
      console.log('This bet would never have won any prize.');
    } else {
      console.log(`\nThis bet would have won ${results.length} time(s):`);
      
      results.forEach((result, index) => {
        console.log(`\n${index + 1}. Contest ${result.contest} (${result.date})`);
        console.log(`   ${result.winLevel}`);
        console.log(`   Matching numbers: [${result.matchingNumbers.join(', ')}]`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

if (require.main === module) {
  main();
}