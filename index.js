const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
    const expression = "^https://discord\\.com/api/.*";
    const regex = new RegExp(expression);

    rl.question('Enter the Discord webhook URL: ', async (url) => {
        if (!url) {
            console.error('Please enter a webhook URL.');
            rl.close();
            return;
        }

        if (!regex.test(url)) {
            console.error('This is not a Discord webhook URL. Note: The webhook token is required.');
            rl.close();
            return;
        }

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.status === 404) throw new Error("This webhook does not exist (maybe you've already deleted it).");
            if (!response.ok) throw new Error('Failed to delete webhook.');

            console.log('Webhook deleted successfully');
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            rl.close();
        }
    });
};

main();