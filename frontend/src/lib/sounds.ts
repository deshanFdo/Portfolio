'use client';

// Sound Effects Manager for Portfolio
// Uses Web Audio API for lightweight, performant sounds

class SoundManager {
    private context: AudioContext | null = null;
    private enabled: boolean = true;
    private initialized: boolean = false;

    private init() {
        if (this.initialized) return;
        try {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    // Create a short beep/click sound
    private createOscillator(frequency: number, duration: number, volume: number = 0.1, type: OscillatorType = 'sine') {
        if (!this.enabled || !this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    // Hover sound - subtle high-frequency tick
    hover() {
        this.init();
        this.createOscillator(2000, 0.05, 0.05, 'sine');
    }

    // Click sound - satisfying pop
    click() {
        this.init();
        this.createOscillator(800, 0.08, 0.08, 'square');
        setTimeout(() => this.createOscillator(600, 0.05, 0.04, 'sine'), 20);
    }

    // Success sound - ascending notes
    success() {
        this.init();
        this.createOscillator(523, 0.1, 0.08, 'sine'); // C5
        setTimeout(() => this.createOscillator(659, 0.1, 0.08, 'sine'), 100); // E5
        setTimeout(() => this.createOscillator(784, 0.15, 0.08, 'sine'), 200); // G5
    }

    // Error/warning sound
    error() {
        this.init();
        this.createOscillator(200, 0.15, 0.1, 'sawtooth');
    }

    // Transition/whoosh sound
    whoosh() {
        this.init();
        if (!this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.setValueAtTime(100, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(2000, this.context.currentTime + 0.15);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.05, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.2);
    }

    // Typing/terminal sound
    type() {
        this.init();
        this.createOscillator(1200 + Math.random() * 400, 0.02, 0.03, 'square');
    }
}

// Singleton instance
export const soundManager = new SoundManager();

// React hook for using sounds
export function useSounds() {
    const enableSounds = process.env.NEXT_PUBLIC_ENABLE_SOUNDS === 'true';

    return {
        playHover: () => enableSounds && soundManager.hover(),
        playClick: () => enableSounds && soundManager.click(),
        playSuccess: () => enableSounds && soundManager.success(),
        playError: () => enableSounds && soundManager.error(),
        playWhoosh: () => enableSounds && soundManager.whoosh(),
        playType: () => enableSounds && soundManager.type(),
    };
}
