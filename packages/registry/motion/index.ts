/**
 * Plain UI Motion Tokens & Easing Constants
 */

export const motionDurations = {
  feedback: '120ms',
  exit: '140ms',
  enter: '200ms',
  expand: '260ms',
  morph: '320ms',
} as const;

export const motionEasings = {
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  move: 'cubic-bezier(0.4, 0, 0.2, 1)',
  springSnappy: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  springBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

export const motionProperties = {
  beamAngle: '--plain-beam-angle',
  shimmerAngle: '--plain-shimmer-angle',
  glowAngle: '--plain-glow-angle',
  beamColorFrom: '--plain-beam-color-from',
  beamColorTo: '--plain-beam-color-to',
  glowColor: '--plain-glow-color',
  shimmerColor: '--plain-shimmer-color',
} as const;

export type MotionDuration = keyof typeof motionDurations;
export type MotionEasing = keyof typeof motionEasings;
