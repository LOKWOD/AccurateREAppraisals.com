(() => {
  const KEY = 'lokwod-appraisal-chime-played';
  if (sessionStorage.getItem(KEY) === '1') return;

  const play = async () => {
    if (sessionStorage.getItem(KEY) === '1') return;
    sessionStorage.setItem(KEY, '1');

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    try { if (ctx.state === 'suspended') await ctx.resume(); } catch (_) {}

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.32, ctx.currentTime + 0.012);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.78);
    master.connect(ctx.destination);

    const tone = (freq, start, duration, gain, type = 'sine') => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(g); g.connect(master);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.02);
    };

    tone(1760, 0.00, 0.10, 0.45, 'triangle');
    tone(1320, 0.07, 0.11, 0.34, 'triangle');
    tone(2093, 0.18, 0.32, 0.55, 'sine');
    tone(2637, 0.21, 0.28, 0.22, 'sine');

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.035));
    const noise = ctx.createBufferSource();
    const ng = ctx.createGain();
    noise.buffer = buffer;
    ng.gain.value = 0.18;
    noise.connect(ng); ng.connect(master);
    noise.start(ctx.currentTime + 0.02);

    setTimeout(() => { try { ctx.close(); } catch (_) {} }, 1200);
  };

  const once = () => {
    play();
    window.removeEventListener('pointerdown', once, true);
    window.removeEventListener('keydown', once, true);
  };
  window.addEventListener('pointerdown', once, true);
  window.addEventListener('keydown', once, true);
})();
