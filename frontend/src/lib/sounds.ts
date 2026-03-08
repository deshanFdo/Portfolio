'use client';

const noop = () => {};

export const soundManager = {
    setEnabled: noop,
    hover: noop,
    click: noop,
    success: noop,
    error: noop,
    whoosh: noop,
    type: noop,
};

export function useSounds() {
    return {
        playHover: noop,
        playClick: noop,
        playSuccess: noop,
        playError: noop,
        playWhoosh: noop,
        playType: noop,
    };
}
