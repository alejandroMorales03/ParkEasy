import exec from 'child_process'

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

module.exports = runPythonScraper;