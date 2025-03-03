import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: "new" }); // Використовуємо новий headless режим
    const page = await browser.newPage();

    // Встановлюємо User-Agent
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Відкриваємо сторінку cron.php
    await page.goto("https://moodle-ua.free.nf/admin/cron.php?password=1234", {
        waitUntil: "networkidle2",
    });

    // Отримуємо HTML-вміст сторінки (перевірка результату)
    const content = await page.content();
    console.log("✅ Cron викликано успішно", content.slice(-1000));

    await browser.close();
})();
