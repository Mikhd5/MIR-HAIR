# MIRÉ HAIR — Premium Website

Готовий адаптивний сайт-візитка студії MIRÉ HAIR.

## Запуск
- Відкрийте `index.html` у браузері або завантажте всю папку на Vercel / Netlify.
- Це статичний сайт: збірка та сервер не потрібні.

## Як додати відео у перший екран
1. Підготуйте горизонтальний MP4 (H.264), бажано 1920×1080 або 3840×2160, без звуку.
2. Назвіть файл `hero.mp4`.
3. Покладіть його у папку `` поруч із `hero-poster.jpg`.
4. Перезавантажте сайт. Відео автоматично замінить poster, якщо браузер зможе його відтворити.

Рекомендації для відео: 8–15 секунд, плавний рух волосся/камери, без титрів і водяних знаків, темна експозиція, щоб текст зліва читався. Для мобільної версії доречно підготувати вертикальне відео; наразі використовується той самий файл з адаптивним кадруванням.

## Логотипи
- `mire-logo.svg` — основний круглий векторний логотип із прозорим фоном.
- `mire-logo.png` — PNG 1800×1800 із прозорим фоном.
- `mire-wordmark.svg` / `.png` — горизонтальна версія для шапки сайту та футера.

## Що легко змінити
- Ціни та назви процедур — в `script.js` (об'єкт `priceData`) і розділі додаткових послуг у `index.html`.
- Instagram — замінити `https://www.instagram.com/mire_heir/` у `index.html` та `script.js`.
- Фото портфоліо — замінити `work-*.jpg`, зберігши імена файлів. Для 4K/Retina вигляду на великих екранах бажано використати оригінальні фото/відео з камери, а не скриншоти Instagram.
- Poster першого екрану — замінити `hero-poster.jpg` на власне фото/кадр з відео.

## Наявні функції
- адаптивна мобільна/десктопна версія;
- мобільне меню;
- анімації появи секцій з урахуванням `prefers-reduced-motion`;
- інтерактивний прайс: перемикання послуги та довжини;
- фотогалерея зі збільшенням;
- Instagram CTA;
- відео hero з fallback poster.

Адресу студії, телефон, графік роботи та відгуки не вигадано — їх можна додати після отримання від власниці.


## Hero video

The supplied portrait salon clip has been trimmed to a 14-second hero segment and added as `hero.mp4`. The matching still frame is `hero-poster.jpg`. The video element is already wired into the hero section with muted, autoplay, loop and playsinline attributes.

To replace it later, overwrite `hero.mp4` with the preferred final video (keep the same filename). The uploaded source file reports 512×910 pixels, despite the filename suggesting 1080×1920; this edit preserves its native pixel dimensions rather than falsely labeling an upscale as 4K. The website layout supports large/4K screens, but true 4K video requires a higher-resolution source.


## Оновлення адаптивності та швидкодії
- Мобільне меню тепер перекриває весь екран, не конфліктує з логотипом і підтримує закриття клавішею Escape.
- Hero-відео не завантажується на мобільних пристроях, при Save Data та з увімкненим reduced motion; залишається оптимізований постер.
- Додано фокус-стилі, керування вкладками прайсу зі стрілок клавіатури та fallback для браузерів без IntersectionObserver.
- Зображення в портфоліо замінюються новими згенерованими матеріалами з окремого пакета.
