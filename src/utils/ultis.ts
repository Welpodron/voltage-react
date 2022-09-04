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
  props: Record<string, number | string>;
}

export interface IAnimationConfig {
  _from: Record<string, { raw: number; unit: string; value: string }>;
  _to: Record<string, { raw: number; unit: string; value: string }>;
  state: IAnimationState;
  startedAt: number;
  animationFrameId?: number;
  finished: deferredPromise<unknown>;
  prefersReducedMotion?: boolean;
}

export interface IAnimationParams {
  duration: number;
  from: Record<string, string | number>;
  to: Record<string, string | number>;

  easing?: (progress: number) => number;
  step?: (state: IAnimationState) => void;
  before?: (state: IAnimationState) => void;
  after?: (state: IAnimationState) => void;
}

const defaultAnimationConfig: IAnimationConfig = {
  startedAt: 0,
  state: { completed: false, props: {} },
  finished: deferPromise(),
  _from: {},
  _to: {},
};

export class Animation {
  config: IAnimationConfig;
  params: IAnimationParams;

  constructor(params: IAnimationParams) {
    this.params = params;

    const config: Record<string, any> = {};

    config._from = {};
    config._to = {};
    config.state = { completed: false, props: {} };

    Object.keys(this.params.from).forEach((key) => {
      if (this.params.to.hasOwnProperty(key)) {
        const splittedValueFrom = this.splitCSSValue(this.params.from[key]);

        if (splittedValueFrom == null) return;

        const splittedValueTo = this.splitCSSValue(this.params.to[key]);

        if (splittedValueTo == null) return;

        config._from[key] = splittedValueFrom;
        config._to[key] = splittedValueTo;

        config.state.props[key] = splittedValueFrom;
      }
    });

    this.config = { ...defaultAnimationConfig, ...config };
  }

  splitCSSValue = (value: string | number) => {
    if (value === "") return;

    if (typeof value === "string") {
      const split = value.match(/^([-.\d]+(?:\.\d+)?)(.*)$/);

      if (!split) return;

      return {
        raw: parseFloat(split[1].trim()),
        unit: split[2].trim(),
        value: "",
      };
    }

    return { raw: value, unit: "", value: "" };
  };

  loop = (timeStamp: number) => {
    if (!this.config.startedAt) this.config.startedAt = timeStamp;

    const easing =
      this.params.easing ??
      ((x: number) =>
        x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const progressMs = timeStamp - this.config.startedAt;
    let progress = Math.min(easing(progressMs / this.params.duration), 1);

    if (this.config.prefersReducedMotion) {
      progress = 1;
    }

    this.step(progress);

    if (progress < 1) {
      this.config.animationFrameId = requestAnimationFrame(this.loop);
    } else {
      return this.stop();
    }
  };

  step = (progress: number) => {
    Object.keys(this.config.state.props).forEach((key) => {
      this.config.state.props[key] =
        this.config._from[key].raw +
        (this.config._to[key].raw - this.config._from[key].raw) * progress;

      // TODO: Rework!
      if (this.config._from[key].unit) {
        this.config.state.props[key] =
          this.config.state.props[key] + this.config._from[key].unit;
      }
    });

    if (this.params.step) {
      this.params.step(this.config.state);
    }
  };

  start = () => {
    if (this.params.before) {
      this.params.before(this.config.state);
    }

    this.config.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.config.animationFrameId = requestAnimationFrame(this.loop);
  };

  stop = () => {
    if (this.config.animationFrameId != null) {
      cancelAnimationFrame(this.config.animationFrameId);
    }
    this.config.state.completed = true;
    this.config.finished.resolve(true);

    if (this.params.after) {
      this.params.after(this.config.state);
    }
  };
}

export const throttle = (func: Function, delayMs: number) => {
  let isThrotting = false;
  let savedArgs: any[] = [];

  const wrapper = (...args: any[]) => {
    if (isThrotting) {
      savedArgs = args;
      return;
    }

    isThrotting = true;

    func.apply(this, args);

    setTimeout(() => {
      isThrotting = false;

      if (savedArgs.length) {
        wrapper.apply(this, savedArgs);
        savedArgs = [];
      }
    }, delayMs);
  };

  return wrapper;
};
