import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cartoniq-website',
    code: 'CTQ-01',
    title: 'CartonIQ Portfolio & Cybernetic OS',
    tagline: 'Futuristic developer hub, terminal command center, and project dossier.',
    category: 'web',
    status: 'Active',
    verified: true,
    description: 'The production digital showcase for CARTONIQ. Engineered with React, Vite, Tailwind CSS, kinetic typography, an interactive developer terminal, and zero 3D overhead.',
    longDescription: 'Engineered as an interactive personal developer operating system. Features include a terminal emulator with safe commands, real-time client inquiry pipeline via mailto & clipboard fallback, responsive 2D particle canvas, and strict adherence to accessibility and zero-bloat principles.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Interactive 2D kinetic typography & scanline opening sequence',
      'Client-side terminal command interpreter (help, about, projects, skills, contact)',
      'Direct client inquiry system with honest validation and mailto / clipboard routing',
      'High-performance 2D canvas particle field with pause & reduced-motion support',
      'Zero 3D overhead for lightweight, instant mobile performance'
    ],
    architecture: [
      'Vite SPA compilation target for fast static delivery',
      'Component-based modular HUD panels',
      'Stateful command dispatcher and history buffer',
      'Fluid typographic clamp scaling for small mobile to ultra-wide displays'
    ],
    metrics: [
      { label: '3D Overhead', value: '0 KB (Pure 2D)' },
      { label: 'Performance', value: 'Instant' },
      { label: 'Responsive', value: 'Mobile-First' }
    ],
    repoUrl: 'https://github.com/CartonIQ/cartoniq-website',
    demoUrl: 'https://cartoniq.runs-at.dev',
    releaseDate: '2025 - Active'
  },
  {
    id: 'android-system-utility',
    code: 'CTQ-02',
    title: 'Android Native Utility & Toolkit',
    tagline: 'Lightweight Android tools built for fast device diagnostics and workflow automation.',
    category: 'android',
    status: 'Production',
    verified: true,
    description: 'Native Android application focusing on system diagnostics, storage telemetry, and background service optimization using modern Kotlin and Android Jetpack.',
    longDescription: 'Engineered directly with modern Kotlin and Gradle build chains. Features background battery-aware workers, storage tree document providers, and strict memory management to avoid GC stalls on budget devices.',
    technologies: ['Kotlin', 'Android SDK', 'Jetpack WorkManager', 'Room DB', 'Material 3'],
    features: [
      'Modern Android Material Design 3 interface with dynamic theme compliance',
      'Low memory footprint, zero superfluous background telemetry',
      'Efficient background task execution via Jetpack WorkManager',
      'Granular permission handling adhering to Android 14+ requirements'
    ],
    architecture: [
      'MVVM (Model-View-ViewModel) architectural pattern',
      'Kotlin Coroutines and StateFlow for reactive UI state updates',
      'Strict separation of data repository and presentation layer'
    ],
    metrics: [
      { label: 'Language', value: '100% Kotlin' },
      { label: 'Target', value: 'Android 10 - 15' },
      { label: 'Architecture', value: 'Clean MVVM' }
    ],
    repoUrl: 'https://github.com/CartonIQ',
    releaseDate: 'Active Project'
  },
  {
    id: 'termux-dev-lab',
    code: 'CTQ-03',
    title: 'Termux Linux Automation & Script Suite',
    tagline: 'Portable Linux developer workflow scripts tailored for mobile coding on Android.',
    category: 'tools',
    status: 'Open Source',
    verified: true,
    description: 'A curated toolkit of Bash scripts, package configurations, and build recipes for running compilers, git automation, and test runners inside Termux without root.',
    longDescription: 'Created out of the practical need to code, build, and debug software anywhere using an Android device. Automates environment setup, dotfile management, git synchronization, and fast local HTTP testing proxies.',
    technologies: ['Bash', 'Linux', 'Termux', 'Git', 'POSIX Shell'],
    features: [
      'Automated bootstrapping of node, python, clang, and git tools',
      'Quick-commit and branch workflow shortcuts with safety prompts',
      'Local network test server dispatcher with QR code generation for LAN testing',
      'Terminal prompt HUD with battery, memory, and git branch status'
    ],
    architecture: [
      'Modular shell scripts with strict error trapping (set -euo pipefail)',
      'Zero external dependencies beyond standard Termux userland',
      'Configurable via simple JSON/ENV environment files'
    ],
    metrics: [
      { label: 'Environment', value: 'Termux / Linux' },
      { label: 'Root Required', value: 'None' },
      { label: 'License', value: 'MIT' }
    ],
    repoUrl: 'https://github.com/CartonIQ',
    releaseDate: 'Continuous'
  },
  {
    id: 'apk-inspect-analyzer',
    code: 'CTQ-04',
    title: 'APK Manifest & Asset Profiler',
    tagline: 'Static analysis helper for Android packages, permissions, and manifest auditing.',
    category: 'tools',
    status: 'Development',
    verified: true,
    description: 'Developer utility for quickly inspecting compiled Android packages (APK / AAB), extracting AndroidManifest.xml permissions, service exports, and dex metadata.',
    longDescription: 'Provides deep visibility into compiled Android binaries. Helps detect redundant permissions, unexported receivers that could cause intent issues, and uncompressed asset bloat before publishing.',
    technologies: ['Java', 'AAPT2', 'Android Debug Bridge (ADB)', 'Gradle'],
    features: [
      'Fast permission cross-reference matrix against Android API security levels',
      'Exported component audit (Activities, Receivers, Services)',
      'Resource size breakdown identifying large uncompressed assets',
      'Direct ADB deployment and intent broadcast testing'
    ],
    architecture: [
      'Command-line parser with human-readable colorized table output',
      'Pluggable audit rules engine',
      'Lightweight memory-mapped zip inspector for rapid scanning'
    ],
    metrics: [
      { label: 'Platform', value: 'CLI / Android Tooling' },
      { label: 'Status', value: 'Under Active Testing' }
    ],
    repoUrl: 'https://github.com/CartonIQ',
    releaseDate: 'In Development'
  },
  {
    id: 'cartoniq-hybrid-shell',
    code: 'CTQ-05',
    title: 'Capacitor Hybrid App Bridge Shell',
    tagline: 'Lightweight web-to-Android wrapper with native hardware plugin bridges.',
    category: 'android',
    status: 'Development',
    verified: true,
    description: 'Reusable Capacitor native shell integrating web frontend components with native Android intents, biometrics, vibration feedback, and local file storage.',
    longDescription: 'Bridges the gap between responsive web design and native Android capabilities. Implements custom native Kotlin plugins for haptic feedback, status bar customization, and offline secure keystore access.',
    technologies: ['Capacitor', 'Kotlin', 'TypeScript', 'Android Studio'],
    features: [
      'Native Android status and navigation bar color matching with system themes',
      'Hardware haptic feedback triggers for interactive web elements',
      'Secure local storage wrapper backed by Android EncryptedSharedPreferences',
      'Offline caching service worker synchronization'
    ],
    architecture: [
      'Capacitor custom plugin bridge with async Promise returns',
      'Thread-safe native execution on Android background dispatchers'
    ],
    metrics: [
      { label: 'Framework', value: 'Capacitor + Kotlin' },
      { label: 'Packaging', value: 'APK / Bundle' }
    ],
    repoUrl: 'https://github.com/CartonIQ',
    releaseDate: 'Prototype'
  }
];
