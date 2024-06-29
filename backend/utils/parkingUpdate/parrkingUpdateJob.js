const runPythonScraper = () => {
    exec('python3 parkingUpdate.py', (error, stdout, stderr) => {
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

const job = new CronJob('*/5 * * * *', () => {
    console.log('Running Python scraper...');
    runPythonScraper();
});

job.start();