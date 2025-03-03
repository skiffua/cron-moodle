import puppeteer from 'puppeteer';

export default defineComponent({
    async run({ steps, $ }) {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );

        await page.goto("https://moodle-ua.free.nf/admin/cron.php?password=1234", {
            waitUntil: "networkidle2",
        });

        const content = await page.content();
        console.log("✅ Cron викликано успішно", content.slice(-1000)); // Останні 1000 символів

        await browser.close();
    },
});
