/**
 * Enhanced celestial audio effects using Web Audio API:
 * Crystal star collection chimes with dynamic combo scaling,
 * reward fanfares, secret chamber hum, and peaceful bedtime lullaby.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private lullabyInterval: number | null = null;
  private isLullabyPlaying: boolean = false;
  private comboStreak: number = 0;
  private lastCatchTime: number = 0;

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Star collection sound effect with dynamic musical combo scaling:
   * Multi-layered crystal bells, sweet bubble pop, ascending shimmer arpeggios,
   * and stardust ringing sustain.
   */
  playStarChime(rarity: 'common' | 'uncommon' | 'rare' | 'legendary' = 'common') {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Track combo streak for pitch escalation
    const timeSinceLast = now - this.lastCatchTime;
    if (timeSinceLast < 1.4) {
      this.comboStreak = Math.min(this.comboStreak + 1, 7);
    } else {
      this.comboStreak = 0;
    }
    this.lastCatchTime = now;

    // Combo transposition factor (semitones up)
    const semitoneShift = this.comboStreak * 2;
    const pitchMultiplier = Math.pow(2, semitoneShift / 12);

    // Harmonic pentatonic chords per rarity
    const baseChords = {
      common: [1046.5, 1318.51, 1567.98, 2093.0], // C6, E6, G6, C7 (Sparkly bright C-major)
      uncommon: [1174.66, 1479.98, 1760.0, 2349.32], // D6, F#6, A6, D7 (Magical high D-major)
      rare: [1318.51, 1661.22, 1975.53, 2637.02], // E6, G#6, B6, E7 (Golden celestial chime)
      legendary: [1567.98, 1975.53, 2349.32, 3135.96], // G6, B6, D7, G7 (Super brilliant rainbow)
    };

    const notes = baseChords[rarity].map((f) => f * pitchMultiplier);

    // Master volume gain node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.22, now);
    masterGain.connect(ctx.destination);

    // 1. Crystal Celesta Bell Arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Alternate between sine and soft triangle for crystal resonance
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.038);

      // Sparkling bell envelope with ringing decay
      noteGain.gain.setValueAtTime(0.001, now + idx * 0.038);
      noteGain.gain.linearRampToValueAtTime(0.18, now + idx * 0.038 + 0.012);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.038 + 0.55);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + idx * 0.038);
      osc.stop(now + idx * 0.038 + 0.6);
    });

    // 2. High Shimmer Sparkle (Frequency-modulated glissando)
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(notes[0] * 1.5, now);
    shimmerOsc.frequency.exponentialRampToValueAtTime(notes[notes.length - 1] * 2.2, now + 0.16);

    shimmerGain.gain.setValueAtTime(0.001, now);
    shimmerGain.gain.linearRampToValueAtTime(0.09, now + 0.03);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    shimmerOsc.start(now);
    shimmerOsc.stop(now + 0.3);

    // 3. Gentle "Star Bubble Plop" attack
    const plopOsc = ctx.createOscillator();
    const plopGain = ctx.createGain();
    plopOsc.type = 'sine';
    plopOsc.frequency.setValueAtTime(580 * pitchMultiplier, now);
    plopOsc.frequency.exponentialRampToValueAtTime(880 * pitchMultiplier, now + 0.05);

    plopGain.gain.setValueAtTime(0.1, now);
    plopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    plopOsc.connect(plopGain);
    plopGain.connect(masterGain);
    plopOsc.start(now);
    plopOsc.stop(now + 0.09);

    // 4. Warm Celestial Undertone
    const warmOsc = ctx.createOscillator();
    const warmGain = ctx.createGain();
    warmOsc.type = 'sine';
    warmOsc.frequency.setValueAtTime(notes[0] * 0.5, now);
    warmGain.gain.setValueAtTime(0.07, now);
    warmGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    warmOsc.connect(warmGain);
    warmGain.connect(masterGain);
    warmOsc.start(now);
    warmOsc.stop(now + 0.42);
  }

  /**
   * Reward unlock fanfare (for game milestones and secret discovery)
   */
  playRewardFanfare() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0]; // C5 to C7 triumph

    fanfareNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === fanfareNotes.length - 1 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.075);

      gain.gain.setValueAtTime(0.001, now + idx * 0.075);
      gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.075 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.075 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.075);
      osc.stop(now + idx * 0.075 + 0.65);
    });
  }

  /**
   * Story scene transition soft chime
   */
  playSceneChime() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.055);

      gain.gain.setValueAtTime(0.001, now + idx * 0.055);
      gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.055 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.55);
    });
  }

  /**
   * Nightlight click sound (cozy lamp click & warm hum)
   */
  playNightlightClick(turningOn: boolean) {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(turningOn ? 440 : 330, now);
    osc.frequency.exponentialRampToValueAtTime(turningOn ? 880 : 220, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Secret unlock dramatic celestial resonance
   */
  playSecretUnlock() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.95);
    });
  }

  /**
   * Peaceful Bedtime Lullaby (Gentle music box melody)
   */
  startLullaby() {
    if (this.isLullabyPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isLullabyPlaying = true;

    // Twinkle Twinkle / Brahms style music box notes
    const melody = [
      523.25, 523.25, 783.99, 783.99, 880.0, 880.0, 783.99,
      698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25,
      783.99, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33,
      783.99, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33,
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isLullabyPlaying || !this.ctx) return;
      const t = this.ctx.currentTime;
      const freq = melody[noteIdx];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Music box bell envelope
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.7);

      noteIdx = (noteIdx + 1) % melody.length;
    };

    playNextNote();
    this.lullabyInterval = window.setInterval(playNextNote, 750);
  }

  stopLullaby() {
    this.isLullabyPlaying = false;
    if (this.lullabyInterval !== null) {
      clearInterval(this.lullabyInterval);
      this.lullabyInterval = null;
    }
  }

  getIsLullabyPlaying(): boolean {
    return this.isLullabyPlaying;
  }
}

export const soundManager = new SoundManager();
