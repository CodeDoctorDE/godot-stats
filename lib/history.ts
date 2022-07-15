import dayjs from 'dayjs';
// Import fs
import * as fs from 'fs';

// const historySize = 50;

export const writeHistory = async (name: string, data: any) => {
    const fileName = `history/${name}.json`;
    const date = dayjs().format('YYYY-MM-DD');
    const history = readHistory(name) ?? {};
    history[date] = data;

    fs.writeFileSync(fileName, JSON.stringify(history, null, 2));
    // removeOldHistory(name);
}

/*export const removeOldHistory = async (data: any) => {
    const fileName = `history/${data}.json`;
    const history = readHistory(data) ?? {};
    const dates = Object.keys(history);
    const removableDates = dates.filter(date => dayjs(date).isBefore(dayjs().subtract(historySize, 'day')));
    removableDates.forEach(date => {
        delete history[date];
    });
    fs.writeFileSync(fileName, JSON.stringify(history));
}*/

export const readLastHistory = (name: string): { date: string, data: any } | null => {
    const history = readHistory(name);
    if (history) {
        const dates = Object.keys(history);
        const lastDate = dates[dates.length - 1];
        return { date: lastDate, data: history[lastDate] };
    }
    return null;
}

export const readHistory = (name: string): { [key in string]: any } => {
    const fileName = `history/${name}.json`;
    if (fs.existsSync(fileName)) {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }
    return {};
}