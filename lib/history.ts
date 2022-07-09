// Import fs
import * as fs from 'fs';

const historySize = 50;


const renameHistory = (number: number, newNumber: number) => {
    // Rename file in history/number.txt to history/newNumber.txt
    const fileName = `history/${number}.txt`;
    const newFileName = `history/${newNumber}.txt`;
    if (fs.existsSync(fileName)) {
        console.log(`Renaming ${fileName} to ${newFileName}`);
        fs.renameSync(fileName, newFileName);
    }
}
export const bumpHistory = async () => {
    if (fs.existsSync('history/${historySize}.txt')) {
        fs.unlinkSync(`history/${historySize}.txt`);
    }
    for (var i = historySize - 1; i >= 0; i--) {
        renameHistory(i, i + 1);
    }
}

export const writeHistory = async (data: string) => {
    bumpHistory();
    const fileName = `history/0.txt`;
    fs.writeFileSync(fileName, data);
}

export const overwriteHistory = async (data: string) => {
    const fileName = `history/0.txt`;
    fs.writeFileSync(fileName, data);
}

export const readLastHistory = (): string | null => {
    const fileName = `history/1.txt`;
    if (fs.existsSync(fileName)) {
        return fs.readFileSync(fileName, 'utf8');
    }
    return null;
}

export const readHistory = (): string[] => {
    const history: string[] = [];
    for (var i = 0; i < historySize; i++) {
        const fileName = `history/${i}.txt`;
        if (fs.existsSync(fileName)) {
            history.push(fs.readFileSync(fileName, 'utf8'));
        }
    }
    return history;
}