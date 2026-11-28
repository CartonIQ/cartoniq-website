// All visible copy lives here. Everything below comes from the original
// portfolio source or from the owner's master prompt. Nothing is invented.
// To add a screenshot later, put the image in public/screens/ and set `shot`.

export const SITE = {
  name: "CartonIQ",
  url: "https://cartoniq.runs-at.dev",
  email: "cartoniq.business@gmail.com",
  ghUser: "CartonIQ",
  founder: "Mohd Arsh",
  city: "New Delhi, India",
  videoId: "1f0x03KvSBI", // PDF Atelier demo on YouTube
};

export const NAV = [
  { id: "top", n: "01", label: "Introduction" },
  { id: "philosophy", n: "02", label: "Philosophy" },
  { id: "founder", n: "03", label: "Founder" },
  { id: "products", n: "04", label: "Products" },
  { id: "lab", n: "05", label: "Laboratory" },
  { id: "archive", n: "06", label: "Archive" },
  { id: "technology", n: "07", label: "Technology" },
  { id: "contact", n: "08", label: "Contact" },
  { id: "end", n: "09", label: "End" },
];

export const PRINCIPLES = [
  { t: "Independent", d: "CartonIQ is an independent studio. Products are chosen because they are useful to someone, not because they are fashionable." },
  { t: "Practical", d: "Each app starts from an everyday task and aims to do that one task well." },
  { t: "Offline-first", d: "Apps are designed to keep working without a connection, so the device in your hand does the work." },
  { t: "Privacy-conscious", d: "The aim is to keep your data on your device where possible, and to be plain about anything that is not." },
  { t: "Considered", d: "Clear interfaces that feel thought through, not crowded." },
  { t: "Reliable", d: "Apps that open fast and behave the same way every time." },
];

export const JOURNEY = [
  { year: "2020–2025", title: "Owner and Manager, Harsh Packaging", text: "Ran day-to-day operations at a corrugated packaging business in New Delhi." },
  { year: "2025", title: "Found Android development", text: "Picked up a phone and started writing apps with nothing but a terminal." },
  { year: "2026", title: "Founded CartonIQ", text: "An independent studio for offline-first Android apps. SilentSignal launched on Google Play." },
];

// Pixel glyphs carried over from the original site. Letters map to colours in Glyphs.jsx.
export const GLYPHS = {
  wave: ["....w.....", "....w.....", "....w.....", "..p.w.....", "..p.w.p...", "..p.w.p...", "p.p.w.p...", "p.p.w.p.p.", "p.p.w.p.p.", "p.p.w.p.p."],
  image: ["wwwwwwwwww", "wssssssssw", "wsssssggsw", "wsssssggsw", "wssbsssssw", "wsbbbssbsw", "wbbbbbbbbw", "wbbbbbbbbw", "wbbbbbbbbw", "wwwwwwwwww"],
  doc: ["wwwwwwww", "wppppppw", "wpbbbbpw", "wppppppw", "wpbbbbpw", "wppppppw", "wpbbpppw", "wppppppw", "wppgggpw", "wwwwwwww"],
};

export const PRODUCTS = [
  {
    id: "silentsignal", name: "SilentSignal", status: "live", statusLabel: "Live on Google Play",
    line: "Data over sound, 100% offline.",
    purpose: "Moves data using sound, with no network involved.",
    url: "https://play.google.com/store/apps/details?id=com.cartoniq.silentsignal",
    cta: "Get it on Google Play", glyph: "wave", shot: "", art: "/images/silentsignal-card.svg", artLabel: "SIGNAL / 001",
  },
  {
    id: "stealthtext", name: "StealthText", status: "testing", statusLabel: "In testing",
    line: "Hide secrets in photos.",
    purpose: "Hides secrets inside ordinary photos.",
    url: "https://play.google.com/store/apps/details?id=com.cartoniq.stealthtext",
    cta: "Open the Google Play page", glyph: "image", shot: "", art: "/images/stealthtext-card.svg", artLabel: "HIDDEN / 002",
  },
  {
    id: "pdfatelier", name: "PDF Atelier", status: "soon", statusLabel: "Coming soon",
    line: "Premium PDF and AI studio.",
    purpose: "A premium PDF and AI studio. Not released yet. A demo video is below.",
    url: "", cta: "", glyph: "doc", shot: "", art: "/images/pdfatelier-card.svg", artLabel: "STUDIO / 003",
  },
];

export const TECH = [
  { t: "Kotlin", d: "A modern, safe language for Android. Fewer crashes from null values and less boilerplate means more time spent on the product itself." },
  { t: "Jetpack Compose", d: "Interfaces described in code, one state at a time. It keeps screens consistent and makes careful, custom design practical for a small studio." },
  { t: "Room", d: "A structured local database on the device. It is what lets an app keep your data on your phone and still feel organised and fast." },
  { t: "Android SDK", d: "Working directly with the platform means access to the device itself, such as sound, files, images and storage, without a server in the middle." },
  { t: "AI integration", d: "Used where it helps with a real task, as in PDF Atelier, and not added to a product just to say it is there." },
  { t: "GitHub", d: "Work is kept in public repositories under CartonIQ, so experiments and unfinished ideas can be read, not only the finished apps." },
];
