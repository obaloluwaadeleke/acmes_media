export const motionTokens = {
  ease: {
    out:   [0.16, 1, 0.3, 1],     // text reveal — strong deceleration, no overshoot
    inOut: [0.65, 0, 0.35, 1],    // ambient/looping motion
  },
  duration: {
    word:        0.7,
    stagger:     0.12,
    glowDrift:   10,              // baseline; individual orbs vary ±6s for organic feel
    parallaxLag: 0.3,
  },
  delay: {
    glowStart: 0,
    textStart: 0.4,               // text waits until glow is already moving
  },
};
