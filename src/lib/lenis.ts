type LenisScrollEvent = {
  scroll: number;
  limit: number;
  velocity: number;
  progress: number;
};

type LenisOptions = {
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
};

type ScrollTarget = number | string | Element;
type ScrollListener = (event: LenisScrollEvent) => void;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default class Lenis {
  private animatedScroll = 0;
  private targetScroll = 0;
  private lastScroll = 0;
  private touchStartY = 0;
  private releaseScrollLock = 0;
  private isDestroyed = false;
  private isProgrammaticScroll = false;
  private listeners = new Set<ScrollListener>();
  private readonly lerp: number;
  private readonly wheelMultiplier: number;
  private readonly touchMultiplier: number;

  constructor(options: LenisOptions = {}) {
    this.lerp = options.lerp ?? 0.08;
    this.wheelMultiplier = options.wheelMultiplier ?? 1;
    this.touchMultiplier = options.touchMultiplier ?? 1;
    this.animatedScroll = window.scrollY;
    this.targetScroll = window.scrollY;
    this.lastScroll = window.scrollY;

    document.documentElement.classList.add("lenis", "lenis-smooth");
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("touchstart", this.onTouchStart, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("scroll", this.onNativeScroll, { passive: true });
    window.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("click", this.onAnchorClick);
  }

  on(eventName: "scroll", listener: ScrollListener) {
    if (eventName !== "scroll") return;
    this.listeners.add(listener);
  }

  off(eventName: "scroll", listener: ScrollListener) {
    if (eventName !== "scroll") return;
    this.listeners.delete(listener);
  }

  raf(_time: number) {
    if (this.isDestroyed) return;

    const limit = this.limit;
    this.targetScroll = clamp(this.targetScroll, 0, limit);
    const distance = this.targetScroll - this.animatedScroll;

    if (Math.abs(distance) < 0.05) {
      this.animatedScroll = this.targetScroll;
      return;
    }

    this.animatedScroll += distance * this.lerp;
    this.scrollToPosition(this.animatedScroll);
    this.emit();
  }

  scrollTo(target: ScrollTarget, options: { immediate?: boolean; offset?: number } = {}) {
    const value = this.resolveTarget(target) + (options.offset ?? 0);
    this.targetScroll = clamp(value, 0, this.limit);

    if (options.immediate) {
      this.animatedScroll = this.targetScroll;
      this.scrollToPosition(this.animatedScroll);
      this.emit();
    }
  }

  destroy() {
    this.isDestroyed = true;
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("scroll", this.onNativeScroll);
    window.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("click", this.onAnchorClick);
    document.documentElement.classList.remove("lenis", "lenis-smooth");

    if (this.releaseScrollLock) {
      cancelAnimationFrame(this.releaseScrollLock);
    }
  }

  private get limit() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  private onWheel = (event: WheelEvent) => {
    if (this.shouldIgnore(event.target) || event.ctrlKey) return;

    event.preventDefault();
    this.targetScroll = clamp(this.targetScroll + event.deltaY * this.wheelMultiplier, 0, this.limit);
  };

  private onTouchStart = (event: TouchEvent) => {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  };

  private onTouchMove = (event: TouchEvent) => {
    if (this.shouldIgnore(event.target)) return;

    const y = event.touches[0]?.clientY ?? this.touchStartY;
    const delta = (this.touchStartY - y) * this.touchMultiplier;
    this.touchStartY = y;
    event.preventDefault();
    this.targetScroll = clamp(this.targetScroll + delta, 0, this.limit);
  };

  private onNativeScroll = () => {
    if (this.isProgrammaticScroll) return;

    this.animatedScroll = window.scrollY;
    this.targetScroll = window.scrollY;
    this.emit();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.isTypingTarget(document.activeElement)) return;

    const viewportStep = window.innerHeight * 0.85;
    const smallStep = 120;
    let nextScroll: number | null = null;

    if (event.key === "ArrowDown") nextScroll = this.targetScroll + smallStep;
    if (event.key === "ArrowUp") nextScroll = this.targetScroll - smallStep;
    if (event.key === "PageDown") nextScroll = this.targetScroll + viewportStep;
    if (event.key === "PageUp") nextScroll = this.targetScroll - viewportStep;
    if (event.key === "Home") nextScroll = 0;
    if (event.key === "End") nextScroll = this.limit;
    if (event.key === " ") nextScroll = this.targetScroll + (event.shiftKey ? -viewportStep : viewportStep);

    if (nextScroll === null) return;

    event.preventDefault();
    this.targetScroll = clamp(nextScroll, 0, this.limit);
  };

  private onAnchorClick = (event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    const href = link?.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    this.scrollTo(target);
    window.history.pushState(null, "", href);
  };

  private scrollToPosition(value: number) {
    this.isProgrammaticScroll = true;
    window.scrollTo(0, value);

    if (this.releaseScrollLock) {
      cancelAnimationFrame(this.releaseScrollLock);
    }

    this.releaseScrollLock = requestAnimationFrame(() => {
      this.isProgrammaticScroll = false;
    });
  }

  private resolveTarget(target: ScrollTarget) {
    if (typeof target === "number") return target;

    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return this.targetScroll;

    return element.getBoundingClientRect().top + window.scrollY;
  }

  private shouldIgnore(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest("[data-lenis-prevent]"));
  }

  private isTypingTarget(target: Element | null) {
    if (!target) return false;

    const tag = target.tagName.toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || target.hasAttribute("contenteditable");
  }

  private emit() {
    const scroll = window.scrollY;
    const limit = this.limit;
    const velocity = scroll - this.lastScroll;
    this.lastScroll = scroll;

    const event = {
      scroll,
      limit,
      velocity,
      progress: limit > 0 ? scroll / limit : 0,
    };

    this.listeners.forEach((listener) => listener(event));
  }
}
