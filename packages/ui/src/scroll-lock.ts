type ScrollLockSnapshot = {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyPaddingRight: string;
  htmlOverflow: string;
};

type ScrollLockState = {
  count: number;
  scrollY: number;
  snapshot: ScrollLockSnapshot | null;
};

declare global {
  interface Window {
    __nopeScrollLockState?: ScrollLockState;
  }
}

function getState(): ScrollLockState {
  if (!window.__nopeScrollLockState) {
    window.__nopeScrollLockState = {
      count: 0,
      scrollY: 0,
      snapshot: null,
    };
  }

  return window.__nopeScrollLockState;
}

export function lockPageScroll() {
  const state = getState();
  state.count += 1;

  if (state.count > 1) return;

  const { body, documentElement } = document;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  state.scrollY = window.scrollY;
  state.snapshot = {
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyPaddingRight: body.style.paddingRight,
    htmlOverflow: documentElement.style.overflow,
  };

  documentElement.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${state.scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockPageScroll() {
  const state = getState();
  if (state.count === 0) return;

  state.count -= 1;
  if (state.count > 0) return;

  restoreSnapshot(state);
}

export function clearPageScrollLock() {
  const state = getState();
  if (state.count === 0) return;

  state.count = 0;
  restoreSnapshot(state);
}

function restoreSnapshot(state: ScrollLockState) {
  const snapshot = state.snapshot;
  if (!snapshot) return;

  const { body, documentElement } = document;
  body.style.overflow = snapshot.bodyOverflow;
  body.style.position = snapshot.bodyPosition;
  body.style.top = snapshot.bodyTop;
  body.style.left = snapshot.bodyLeft;
  body.style.right = snapshot.bodyRight;
  body.style.width = snapshot.bodyWidth;
  body.style.paddingRight = snapshot.bodyPaddingRight;
  documentElement.style.overflow = snapshot.htmlOverflow;
  window.scrollTo(0, state.scrollY);
  state.snapshot = null;
}
