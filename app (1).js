/* =========================================================
   فضاء | مصمم الوحدات — ثالثة ثانوي أدبي
   app.js

   - ثلاثة عناصر في الصورة: المادة، اسم الوحدة، عنوان الوحدة
   - تصدير مباشر من التصميم الأصلي (1700×1000) بمقياس 5×
     = PNG بأبعاد 8500×5000، مع التحقق من الأبعاد الفعلية
========================================================= */

"use strict";


/* =========================================================
   إعدادات
========================================================= */

const CONFIG = {

    canvasWidth: 1700,
    canvasHeight: 1000,

    exportScale: 5,

    exportWidth: 8500,
    exportHeight: 5000,

    // حدود تكيّف الخطوط داخل التصميم (بكسل التصميم)
    titleMax: 120,
    titleMin: 48,

    unitMax: 58,
    unitMin: 28,

    badgeMax: 38,
    badgeMin: 22,

    // أقصى عرض متاح لشارة المادة واسم الوحدة
    badgeMaxWidth: 1000,

    html2canvasURL:
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"

};


/* =========================================================
   مسارات الشعارات
   مسارات نسبية من مجلد الأداة (حالة الأحرف مهمة على GitHub Pages).
   إن اختلف اسم ملف شعار فضاء الجديد فعدّل المسار هنا فقط.
========================================================= */

const ASSETS = {

    fadaa: "assets/logos/fadaa.png",

    team: "assets/logos/team.png"

};


/* =========================================================
   المواد
   - badge: النص الظاهر داخل الشارة
   - short: يُستخدم في اسم الملف المصدَّر
   - color: لون الشارة (قابل للتعديل لكل مادة)
   لإضافة مادة أو حذفها عدّل هذه المصفوفة فقط.
========================================================= */

const SUBJECTS = [

    {
        id: "quran",
        name: "القرآن الكريم",
        badge: "القرآن الكريم",
        short: "القرآن الكريم",
        color: "#4f6b3a"
    },

    {
        id: "islamic",
        name: "التربية الإسلامية",
        badge: "التربية الإسلامية",
        short: "التربية الإسلامية",
        color: "#5d6a3b"
    },

    {
        id: "arabic-literature",
        name: "الأدب والنصوص",
        badge: "الأدب والنصوص",
        short: "الأدب والنصوص",
        color: "#9b3a26"
    },

    {
        id: "arabic-criticism",
        name: "النقد",
        badge: "النقد",
        short: "النقد",
        color: "#8a3b4a"
    },

    {
        id: "arabic-grammar",
        name: "النحو والصرف والإملاء",
        badge: "النحو والصرف والإملاء",
        short: "النحو والصرف والإملاء",
        color: "#7c4a2d"
    },

    {
        id: "arabic-reading-composition",
        name: "المطالعة والإنشاء",
        badge: "المطالعة والإنشاء",
        short: "المطالعة والإنشاء",
        color: "#a64e26"
    },

    {
        id: "english",
        name: "اللغة الإنجليزية",
        badge: "اللغة الإنجليزية",
        short: "اللغة الإنجليزية",
        color: "#2f5d6b"
    },

    {
        id: "history",
        name: "التاريخ",
        badge: "التاريخ",
        short: "التاريخ",
        color: "#8a5a2b"
    },

    {
        id: "geography",
        name: "الجغرافيا",
        badge: "الجغرافيا",
        short: "الجغرافيا",
        color: "#3f7a52"
    },

    {
        id: "philosophy",
        name: "الفلسفة",
        badge: "الفلسفة",
        short: "الفلسفة",
        color: "#5a4a8a"
    },

    {
        id: "psychology",
        name: "علم النفس",
        badge: "علم النفس",
        short: "علم النفس",
        color: "#a0476b"
    },

    {
        id: "sociology",
        name: "علم الاجتماع",
        badge: "علم الاجتماع",
        short: "علم الاجتماع",
        color: "#b0702a"
    },

    {
        id: "statistics",
        name: "الإحصاء",
        badge: "الإحصاء",
        short: "الإحصاء",
        color: "#6b4f7a"
    },

    {
        id: "information-technology",
        name: "تقنية المعلومات",
        badge: "تقنية المعلومات",
        short: "تقنية المعلومات",
        color: "#2d6a68"
    }

];

const SUBJECT_MAP = {};

SUBJECTS.forEach(subject => {
    SUBJECT_MAP[subject.id] = subject;
});


/* =========================================================
   الأنماط
   accent: لون النجوم والزخارف المرسومة بـ SVG (يُضبط بالسمة
   مباشرة لأن ألوان CSS لا تصل إلى SVG داخل الصورة المصدَّرة).
========================================================= */

const STYLES = {

    classic: { accent: "#9b3a26", badgeStar: "#f2bd8a" },

    ink: { accent: "#f2bd8a", badgeStar: "subject" },

    minimal: { accent: "#c08a70", badgeStar: "#f2bd8a" }

};


/* =========================================================
   القيم الافتراضية
========================================================= */

const DEFAULTS = {

    subject: "arabic-literature",

    style: "classic",

    unit: "الوحدة الأولى",

    title: "عنوان الوحدة"

};


/* =========================================================
   العناصر
========================================================= */

const canvas = document.getElementById("designCanvas");
const canvasWrapper = document.getElementById("canvasWrapper");
const canvasScaler = document.getElementById("canvasScaler");

const subjectInput = document.getElementById("subject");
const unitInput = document.getElementById("unitName");
const titleInput = document.getElementById("unitTitle");
const titleHint = document.getElementById("titleHint");

const subjectBadge = document.getElementById("subjectBadge");
const previewSubject = document.getElementById("previewSubject");
const previewUnit = document.getElementById("previewUnit");
const previewTitle = document.getElementById("previewTitle");
const titleZone = document.getElementById("titleZone");

const exportButton = document.getElementById("exportBtn");
const resetButton = document.getElementById("resetBtn");

const styleButtons = document.querySelectorAll(".style-option");

if (!canvas) {
    console.error("designCanvas غير موجود.");
}

if (!exportButton) {
    console.error("exportBtn غير موجود.");
}


/* =========================================================
   الحالة
========================================================= */

const state = {

    subject: DEFAULTS.subject,

    style: DEFAULTS.style,

    unit: DEFAULTS.unit,

    title: DEFAULTS.title

};


function getSubject() {

    return SUBJECT_MAP[state.subject] || SUBJECTS[0];

}


/* =========================================================
   قائمة المواد في لوحة التحكم
========================================================= */

function populateSubjects() {

    if (!subjectInput) {
        return;
    }

    subjectInput.innerHTML = "";

    SUBJECTS.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject.id;
        option.textContent = subject.name;

        subjectInput.appendChild(option);

    });

}


/* =========================================================
   كتابة عنوان الوحدة (أسطر يدوية عبر <br>)
   تُستخدم عقد نصية فقط، دون innerHTML.
========================================================= */

function setMultilineText(element, text) {

    if (!element) {
        return;
    }

    element.textContent = "";

    const lines =
        String(text)
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

    if (lines.length === 0) {
        lines.push(String(text).trim());
    }

    lines.forEach((line, index) => {

        if (index > 0) {
            element.appendChild(document.createElement("br"));
        }

        element.appendChild(document.createTextNode(line));

    });

}


/* =========================================================
   تحديث النصوص
========================================================= */

function updateText() {

    const subject = getSubject();

    if (previewSubject) {
        previewSubject.textContent = subject.badge;
    }

    if (previewUnit) {
        previewUnit.textContent = state.unit || DEFAULTS.unit;
    }

    setMultilineText(
        previewTitle,
        state.title || DEFAULTS.title
    );

}


/* =========================================================
   تحديث لون المادة
========================================================= */

function updateSubject() {

    const subject = getSubject();

    // على التصميم نفسه (ينتقل مع النسخة المصوَّرة)
    if (canvas) {
        canvas.style.setProperty("--subject", subject.color);
    }

    // وعلى الصفحة (لنقطة اللون في لوحة التحكم)
    document.documentElement.style.setProperty(
        "--subject",
        subject.color
    );

}


/* =========================================================
   تحديث النمط
========================================================= */

function updateStyle() {

    if (!canvas) {
        return;
    }

    Object.keys(STYLES).forEach(name => {
        canvas.classList.remove(`style-${name}`);
    });

    if (!STYLES[state.style]) {
        state.style = DEFAULTS.style;
    }

    canvas.classList.add(`style-${state.style}`);

    styleButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.style === state.style
        );

    });

    // ألوان نجوم SVG (بالسمة لا بـ CSS)
    const style = STYLES[state.style];

    canvas.querySelectorAll(".accent-path").forEach(path => {
        path.setAttribute("fill", style.accent);
    });

    const badgeStarColor =
        style.badgeStar === "subject"
            ? getSubject().color
            : style.badgeStar;

    canvas.querySelectorAll(".badge-path").forEach(path => {
        path.setAttribute("fill", badgeStarColor);
    });

}


/* =========================================================
   تكيّف الأحجام مع الطول
========================================================= */

function fitBadge() {

    if (!subjectBadge || !previewSubject) {
        return;
    }

    const extra =
        state.style === "minimal"
            ? 92 + 10
            : 92 + 2 * (26 + 22);

    let size = CONFIG.badgeMax;

    subjectBadge.style.fontSize = `${size}px`;

    while (
        previewSubject.offsetWidth + extra > CONFIG.badgeMaxWidth &&
        size > CONFIG.badgeMin
    ) {

        size -= 1;

        subjectBadge.style.fontSize = `${size}px`;

    }

}


function fitUnit() {

    if (!previewUnit) {
        return;
    }

    let size = CONFIG.unitMax;

    previewUnit.style.fontSize = `${size}px`;

    while (
        previewUnit.scrollWidth > previewUnit.clientWidth + 1 &&
        size > CONFIG.unitMin
    ) {

        size -= 1;

        previewUnit.style.fontSize = `${size}px`;

    }

}


function titleOverflows(maxHeight) {

    return (
        previewTitle.scrollHeight > maxHeight ||
        previewTitle.scrollWidth > previewTitle.clientWidth + 1
    );

}


/*
 * يرجع true إذا استقر العنوان داخل الحدود الآمنة.
 */

function fitTitle() {

    if (!previewTitle || !titleZone) {
        return true;
    }

    const maxHeight = titleZone.clientHeight - 20;

    let size = CONFIG.titleMax;

    previewTitle.style.fontSize = `${size}px`;

    if (maxHeight <= 0) {
        return true;
    }

    while (
        titleOverflows(maxHeight) &&
        size > CONFIG.titleMin
    ) {

        size -= 2;

        previewTitle.style.fontSize = `${size}px`;

    }

    return !titleOverflows(maxHeight);

}


function updateTitleHint(fits) {

    if (!titleHint) {
        return;
    }

    const length = titleInput ? titleInput.value.trim().length : 0;

    titleHint.classList.remove("warn");

    if (!fits) {

        titleHint.classList.add("warn");

        titleHint.textContent =
            "العنوان طويل جدًا ولا يتسع داخل التصميم، اختصره أو قسّمه.";

        return;

    }

    if (length > 90) {

        titleHint.textContent =
            "العنوان طويل؛ سيُصغَّر خطه تلقائيًا ليتسع.";

        return;

    }

    titleHint.textContent =
        "يمكنك الضغط على Enter لتقسيم العنوان إلى سطرين يدويًا.";

}


function fitAll() {

    fitBadge();

    fitUnit();

    const fits = fitTitle();

    updateTitleHint(fits);

    return fits;

}


/* =========================================================
   قراءة الحقول وتحديث التصميم بالكامل
========================================================= */

function readInputs() {

    if (subjectInput) {
        state.subject = subjectInput.value || DEFAULTS.subject;
    }

    if (unitInput) {
        state.unit = unitInput.value.trim();
    }

    if (titleInput) {
        state.title = titleInput.value.trim();
    }

}


function render() {

    updateText();

    updateSubject();

    updateStyle();

    fitAll();

}


function updateDesign() {

    readInputs();

    render();

}


/* =========================================================
   تصغير المعاينة لتناسب العرض (بصريًا فقط)
========================================================= */

function updateScale() {

    if (!canvasWrapper || !canvasScaler) {
        return;
    }

    const width = canvasWrapper.clientWidth;

    if (!width) {
        return;
    }

    canvasScaler.style.transform =
        `scale(${width / CONFIG.canvasWidth})`;

}


/* =========================================================
   الأحداث
========================================================= */

if (subjectInput) {

    subjectInput.addEventListener("change", updateDesign);

    subjectInput.addEventListener("input", updateDesign);

}

if (unitInput) {

    unitInput.addEventListener("input", updateDesign);

}

if (titleInput) {

    titleInput.addEventListener("input", updateDesign);

}

styleButtons.forEach(button => {

    button.addEventListener("click", () => {

        state.style = button.dataset.style || DEFAULTS.style;

        render();

    });

});

if (typeof ResizeObserver === "function" && canvasWrapper) {

    new ResizeObserver(updateScale).observe(canvasWrapper);

} else {

    window.addEventListener("resize", updateScale);

}


/* =========================================================
   إعادة الضبط — يعيد المادة والنمط واسم الوحدة والعنوان
========================================================= */

function resetAll() {

    state.subject = DEFAULTS.subject;
    state.style = DEFAULTS.style;
    state.unit = DEFAULTS.unit;
    state.title = DEFAULTS.title;

    if (subjectInput) {
        subjectInput.value = DEFAULTS.subject;
    }

    if (unitInput) {
        unitInput.value = DEFAULTS.unit;
    }

    if (titleInput) {
        titleInput.value = DEFAULTS.title;
    }

    render();

}

if (resetButton) {

    resetButton.addEventListener("click", resetAll);

}


/* =========================================================
   الشعارات
   - تُحمَّل من مسارات ASSETS فقط.
   - لا شعار بديل: عند الفشل تظهر حالة خطأ في لوحة التحكم
     ويُمنع التصدير برسالة واضحة.
========================================================= */

const logoStatus = {};

function setLogoStatus(key, ok) {

    logoStatus[key] = ok;

    const item = document.querySelector(`[data-logo-item="${key}"]`);
    const stateLabel = document.querySelector(`[data-logo-state="${key}"]`);

    if (item) {
        item.classList.toggle("is-ok", ok);
        item.classList.toggle("is-error", !ok);
    }

    if (stateLabel) {

        stateLabel.textContent =
            ok
                ? "تم تحميل الملف"
                : "الملف غير موجود في هذا المسار";

    }

}

function initLogos() {

    Object.keys(ASSETS).forEach(key => {

        const path = ASSETS[key];

        const pathLabel =
            document.querySelector(`[data-logo-path="${key}"]`);

        if (pathLabel) {
            pathLabel.textContent = path;
        }

        const probe = new Image();

        probe.onload = () => setLogoStatus(key, true);

        probe.onerror = () => setLogoStatus(key, false);

        probe.src = path;

    });

    document.querySelectorAll("img[data-logo]").forEach(image => {

        const path = ASSETS[image.dataset.logo];

        if (path) {
            image.src = path;
        }

    });

}


/* =========================================================
   تحميل html2canvas
========================================================= */

let html2canvasPromise = null;

function loadHtml2Canvas() {

    if (typeof window.html2canvas === "function") {
        return Promise.resolve(window.html2canvas);
    }

    if (html2canvasPromise) {
        return html2canvasPromise;
    }

    html2canvasPromise = new Promise((resolve, reject) => {

        const script = document.createElement("script");

        script.src = CONFIG.html2canvasURL;
        script.async = true;

        script.onload = () => {

            if (typeof window.html2canvas === "function") {
                resolve(window.html2canvas);
            } else {
                reject(new Error("مكتبة التصدير غير متاحة."));
            }

        };

        script.onerror = () => {

            html2canvasPromise = null;

            reject(new Error("فشل تحميل مكتبة التصدير. تأكد من الاتصال بالإنترنت."));

        };

        document.head.appendChild(script);

    });

    return html2canvasPromise;

}


/* =========================================================
   انتظار الصور
   الصورة المعطلة توقف التصدير برسالة صريحة بدل
   تصدير صورة بلا شعار.
========================================================= */

async function waitForImages(element) {

    if (!element) {
        return;
    }

    const images = Array.from(element.querySelectorAll("img"));

    await Promise.all(

        images.map(image => {

            if (image.complete) {
                return Promise.resolve();
            }

            return new Promise(resolve => {

                const done = () => resolve();

                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });

                setTimeout(done, 15000);

            });

        })

    );

    for (const image of images) {

        if (!image.naturalWidth) {

            throw new Error(
                "تعذر تحميل الشعار: " +
                image.getAttribute("src")
            );

        }

        try {

            await image.decode();

        } catch (error) {

            // فك الترميز اختياري؛ الصورة محمّلة فعلًا.

        }

    }

}


/* =========================================================
   انتظار الخطوط
   نطلب الأوزان المستخدمة بنص التصميم نفسه حتى تُحمَّل
   شريحة الحروف العربية فعلًا قبل التصوير.
========================================================= */

function isCairoLoaded() {

    let found = false;

    document.fonts.forEach(face => {

        const family =
            String(face.family).replace(/["']/g, "");

        if (family === "Cairo" && face.status === "loaded") {
            found = true;
        }

    });

    return found;

}

async function waitForFonts() {

    if (!document.fonts) {
        return;
    }

    const sample =
        [
            getSubject().badge,
            state.unit,
            state.title,
            "الوحدة"
        ].join(" ");

    try {

        await Promise.all([
            document.fonts.load("900 120px Cairo", sample),
            document.fonts.load("800 58px Cairo", sample),
            document.fonts.load("900 38px Cairo", sample)
        ]);

        await document.fonts.ready;

    } catch (error) {

        console.warn("تعذر انتظار الخطوط:", error);

    }

    if (!isCairoLoaded()) {

        const proceed = window.confirm(
            "لم يتم التأكد من تحميل خط Cairo (قد يكون الاتصال بالإنترنت " +
            "غير متاح). التصدير الآن قد يخرج بخط مختلف.\n\n" +
            "هل تريد المتابعة؟"
        );

        if (!proceed) {
            throw new Error("أُلغي التصدير لعدم تحميل الخط.");
        }

    }

}


function nextFrame() {

    return new Promise(resolve => {

        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });

    });

}


/* =========================================================
   تثبيت مقاس التصميم
========================================================= */

function lockCanvasSize() {

    if (!canvas) {
        return;
    }

    canvas.style.width = `${CONFIG.canvasWidth}px`;
    canvas.style.height = `${CONFIG.canvasHeight}px`;
    canvas.style.minWidth = `${CONFIG.canvasWidth}px`;
    canvas.style.minHeight = `${CONFIG.canvasHeight}px`;
    canvas.style.maxWidth = `${CONFIG.canvasWidth}px`;
    canvas.style.maxHeight = `${CONFIG.canvasHeight}px`;

}


/* =========================================================
   فحص ما قبل التصدير
========================================================= */

function validateBeforeExport() {

    readInputs();

    if (!state.unit) {
        throw new Error("اكتب اسم الوحدة (مثل: الوحدة الأولى) قبل التصدير.");
    }

    if (!state.title) {
        throw new Error("اكتب عنوان الوحدة قبل التصدير.");
    }

}


/* =========================================================
   إنشاء PNG
   تصدير مباشر من التصميم الأصلي. تُنزَع حاوية المعاينة
   والتصغير البصري من النسخة المصوَّرة فقط (onclone)،
   فيبقى التصميم الظاهر كما هو.
========================================================= */

function backgroundOfCanvas() {

    const color = getComputedStyle(canvas).backgroundColor;

    if (!color || color === "rgba(0, 0, 0, 0)" || color === "transparent") {
        return "#fbf4ea";
    }

    return color;

}

async function createPNG() {

    if (!canvas) {
        throw new Error("التصميم غير موجود.");
    }

    const renderer = await loadHtml2Canvas();

    validateBeforeExport();

    render();

    lockCanvasSize();

    await waitForImages(canvas);

    await waitForFonts();

    // الخط قد يغيّر القياسات بعد التحميل
    fitAll();

    await nextFrame();

    const rendered = await renderer(canvas, {

        width: CONFIG.canvasWidth,
        height: CONFIG.canvasHeight,

        // 1700 × 5 = 8500 ، 1000 × 5 = 5000
        scale: CONFIG.exportScale,

        windowWidth: CONFIG.canvasWidth,
        windowHeight: CONFIG.canvasHeight,

        scrollX: 0,
        scrollY: 0,

        useCORS: true,
        allowTaint: false,

        backgroundColor: backgroundOfCanvas(),

        // foreignObject يسبب مشاكل مع العربية في بعض المتصفحات
        foreignObjectRendering: false,

        imageTimeout: 30000,

        logging: false,

        removeContainer: true,

        onclone: clonedDocument => {

            const clonedCanvas =
                clonedDocument.getElementById("designCanvas");

            if (!clonedCanvas) {
                return;
            }

            // نخرج التصميم من الحاوية المصغَّرة إلى أصل الصفحة
            clonedDocument.body.innerHTML = "";

            clonedDocument.body.style.margin = "0";
            clonedDocument.body.style.padding = "0";
            clonedDocument.documentElement.style.overflow = "visible";

            clonedDocument.body.appendChild(clonedCanvas);

            clonedCanvas.style.position = "relative";
            clonedCanvas.style.left = "0";
            clonedCanvas.style.top = "0";
            clonedCanvas.style.transform = "none";

        }

    });

    if (!rendered) {
        throw new Error("لم يتم إنشاء الصورة.");
    }

    if (
        rendered.width !== CONFIG.exportWidth ||
        rendered.height !== CONFIG.exportHeight
    ) {

        throw new Error(
            "مقاس الصورة الناتجة غير صحيح: " +
            rendered.width + " × " + rendered.height +
            ". قد يكون المتصفح أو الجهاز لا يدعم لوحة بهذا الحجم؛ " +
            "جرّب التصدير من حاسوب بمتصفح حديث."
        );

    }

    assertNotBlank(rendered);

    return rendered;

}


/*
 * فحص بسيط لعدم خروج صورة فارغة:
 * نقارن بكسل من خط الإطار ببكسل من الخلفية الداخلية.
 */

function assertNotBlank(renderedCanvas) {

    try {

        const context = renderedCanvas.getContext("2d");

        const scale = CONFIG.exportScale;

        const frame =
            context.getImageData(
                Math.round(31.5 * scale),
                Math.round(500 * scale),
                1, 1
            ).data;

        const inside =
            context.getImageData(
                Math.round(90 * scale),
                Math.round(500 * scale),
                1, 1
            ).data;

        const same =
            frame[0] === inside[0] &&
            frame[1] === inside[1] &&
            frame[2] === inside[2];

        if (same) {

            throw new Error(
                "الصورة الناتجة تبدو فارغة أو ناقصة. أعد المحاولة."
            );

        }

    } catch (error) {

        if (error && error.message && error.message.indexOf("فارغة") !== -1) {
            throw error;
        }

        console.warn("تعذر فحص محتوى الصورة:", error);

    }

}


/* =========================================================
   تحويل Canvas إلى PNG والتحقق من أبعاد الملف الفعلية
========================================================= */

function canvasToBlob(canvasElement) {

    return new Promise((resolve, reject) => {

        try {

            canvasElement.toBlob(blob => {

                if (!blob) {

                    reject(new Error(
                        "فشل إنشاء ملف PNG، ويُرجّح أن ذاكرة الجهاز لا " +
                        "تكفي لصورة 8500 × 5000. جرّب التصدير من حاسوب " +
                        "وأغلق التبويبات الأخرى."
                    ));

                    return;

                }

                resolve(blob);

            }, "image/png");

        } catch (error) {

            reject(error);

        }

    });

}


/*
 * قراءة الأبعاد من ترويسة ملف PNG نفسه (IHDR).
 */

async function readPngSize(blob) {

    const buffer = await blob.slice(0, 24).arrayBuffer();

    const view = new DataView(buffer);

    const isPng =
        view.getUint32(0) === 0x89504e47 &&
        view.getUint32(4) === 0x0d0a1a0a;

    if (!isPng) {
        throw new Error("الملف الناتج ليس PNG صالحًا.");
    }

    return {
        width: view.getUint32(16),
        height: view.getUint32(20)
    };

}


/* =========================================================
   اسم الملف
========================================================= */

function cleanName(text) {

    return String(text || "")
        .replace(/[\\/:*?"<>|]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

}

function getFilename() {

    const subject = getSubject();

    const name =
        [
            "فضاء-أدبي",
            cleanName(subject.short),
            cleanName(state.unit),
            cleanName(state.title)
        ]
        .filter(Boolean)
        .join("-");

    return name.slice(0, 90).replace(/-$/, "") + ".png";

}


/* =========================================================
   تنزيل
========================================================= */

function downloadBlob(blob) {

    return new Promise(resolve => {

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = getFilename();

        link.style.position = "fixed";
        link.style.left = "-9999px";

        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(() => {

            URL.revokeObjectURL(url);

            resolve();

        }, 4000);

    });

}


/* =========================================================
   تصدير الصورة
========================================================= */

if (exportButton) {

    exportButton.addEventListener("click", async () => {

        if (exportButton.disabled) {
            return;
        }

        const originalHTML = exportButton.innerHTML;

        let finalCanvas = null;

        try {

            exportButton.disabled = true;

            exportButton.innerHTML =
                "<span>⏳</span> جاري تجهيز الصورة...";

            finalCanvas = await createPNG();

            exportButton.innerHTML =
                "<span>⬇</span> جاري حفظ PNG...";

            const blob = await canvasToBlob(finalCanvas);

            // تحقق من الأبعاد الفعلية داخل ملف PNG
            const size = await readPngSize(blob);

            if (
                size.width !== CONFIG.exportWidth ||
                size.height !== CONFIG.exportHeight
            ) {

                throw new Error(
                    "أبعاد ملف PNG الناتج " +
                    size.width + " × " + size.height +
                    " بدل " +
                    CONFIG.exportWidth + " × " + CONFIG.exportHeight + "."
                );

            }

            await downloadBlob(blob);

            exportButton.innerHTML =
                "<span>✓</span> تم التصدير بنجاح";

            setTimeout(() => {
                exportButton.innerHTML = originalHTML;
            }, 1800);

        } catch (error) {

            console.error("EXPORT ERROR:", error);

            exportButton.innerHTML = originalHTML;

            alert(
                "تعذر تصدير صورة الوحدة.\n\n" +
                "السبب:\n" +
                (error && error.message ? error.message : "خطأ غير معروف") +
                "\n\n" +
                "تأكد من وجود الشعارين في:\n" +
                ASSETS.fadaa + "\n" +
                ASSETS.team + "\n\n" +
                "وافتح الأداة عبر GitHub Pages أو خادم محلي " +
                "(وليس بفتح الملف مباشرة)."
            );

        } finally {

            // تحرير الذاكرة بعد انتهاء التصدير
            if (finalCanvas) {
                finalCanvas.width = 0;
                finalCanvas.height = 0;
            }

            exportButton.disabled = false;

        }

    });

}


/* =========================================================
   المساعدة
========================================================= */

const helpButton = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

function openModal() {

    if (!helpModal) {
        return;
    }

    helpModal.classList.add("active");

    helpModal.setAttribute("aria-hidden", "false");

}

function closeHelp() {

    if (!helpModal) {
        return;
    }

    helpModal.classList.remove("active");

    helpModal.setAttribute("aria-hidden", "true");

}

if (helpButton) {
    helpButton.addEventListener("click", openModal);
}

if (closeModal) {
    closeModal.addEventListener("click", closeHelp);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", closeHelp);
}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeHelp();
    }

});


/* =========================================================
   Ctrl + S
========================================================= */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
    ) {

        event.preventDefault();

        if (exportButton) {
            exportButton.click();
        }

    }

});


/* =========================================================
   التهيئة
========================================================= */

function initialize() {

    populateSubjects();

    state.subject = DEFAULTS.subject;
    state.style = DEFAULTS.style;
    state.unit = DEFAULTS.unit;
    state.title = DEFAULTS.title;

    if (subjectInput) {
        subjectInput.value = state.subject;
    }

    if (unitInput) {
        unitInput.value = state.unit;
    }

    if (titleInput) {
        titleInput.value = state.title;
    }

    lockCanvasSize();

    initLogos();

    updateScale();

    render();

    // إعادة التكيّف بعد وصول الخط وبعد اكتمال تحميل الصفحة
    if (document.fonts) {

        if (document.fonts.ready) {
            document.fonts.ready.then(fitAll);
        }

        document.fonts.addEventListener("loadingdone", fitAll);

    }

    window.addEventListener("load", () => {

        updateScale();

        fitAll();

    });

}

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initialize, { once: true });

} else {

    initialize();

}


/* =========================================================
   نهاية app.js
========================================================= */
