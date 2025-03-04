import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    const password = process.env.CRON_PASSWORD; // Отримуємо пароль із GitHub Secrets
    const url = `https://moodle-ua.free.nf/admin/cron.php?password=${password}`;

    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    const content = await page.content();
    console.log("✅ Cron викликано успішно", content.slice(-1000)); // Вивід останніх 1000 символів

    await browser.close();
})();
