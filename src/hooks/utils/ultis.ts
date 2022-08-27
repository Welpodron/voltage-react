interface deferredPromise<T> extends Promise<T> {
  resolve: (value: T) => void;
}

export const deferPromise = () => {
  let resolver: (value: unknown) => void = (value) => {};
  const promise = new Promise((resolve, rejected) => {
    resolver = resolve;
  }) as deferredPromise<unknown>;
  promise.resolve = resolver;
  return promise;
};

interface IAnimationState {
  completed: boolean;
  props: Record<string, any>;
}

export interface IAnimationConfig {
  duration: number;
  from: Record<string, any>;
  to: Record<string, any>;
  easing?: (progress: number) => number;
  step?: (state: IAnimationState) => void;
  before?: (state: IAnimationState) => void;
  after?: (state: IAnimationState) => void;
}

export class Animation {
  startedAt: number = 0;
  animationFrameId?: number;
  finished: deferredPromise<unknown>;
  prefersReducedMotion: boolean = false;

  state: IAnimationState = { completed: false, props: {} };
  config: IAnimationConfig;

  constructor(config: IAnimationConfig) {
    this.config = config;

    this.finished = deferPromise();

    Object.keys(this.config.from).forEach((key) => {
      if (this.config.to.hasOwnProperty(key)) {
        this.state.props[key] = this.config.from[key];
      }
    });
  }

  loop = (timeStamp: number) => {
    if (!this.startedAt) this.startedAt = timeStamp;

    const easing =
      this.config.easing ??
      ((x: number) =>
        x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const progressMs = timeStamp - this.startedAt;
    let progress = Math.min(easing(progressMs / this.config.duration), 1);

    if (this.prefersReducedMotion) {
      progress = 1;
    }

    this.step(progress);

    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame(this.loop);
    } else {
      return this.stop();
    }
  };

  step = (progress: number) => {
    Object.keys(this.state.props).forEach((key) => {
      this.state.props[key] =
        this.config.from[key] +
        (this.config.to[key] - this.config.from[key]) * progress;
    });

    if (this.config.step) {
      this.config.step(this.state);
    }
  };

  start = () => {
    if (this.config.before) {
      this.config.before(this.state);
    }

    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  stop = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.state.completed = true;
    this.finished.resolve(true);

    if (this.config.after) {
      this.config.after(this.state);
    }
  };
}
