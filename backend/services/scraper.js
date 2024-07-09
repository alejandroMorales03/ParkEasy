import { exec } from 'child_process';
import { CronJob } from 'cron';
import path from 'path'




const runPythonScraper = () => {

    const __dirname = path.resolve();
    const scriptPath = path.join(__dirname, 'services', 'scraper.py');
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing scraper: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Scraper stderr: ${stderr}`);
            return;
        }
        console.log(`Scraper stdout: ${stdout}`);
    });
};

const ScrapingJob = new CronJob('*/5 * * * *', () => {
    console.log('Running Python scraper...');
    runPythonScraper();
});

export default ScrapingJob;