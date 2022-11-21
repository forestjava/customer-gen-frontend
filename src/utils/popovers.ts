import { createPopper, Placement } from '@popperjs/core';
import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Reference = RefObject<HTMLElement> | null;

type PopoversCarrier = {
  isOpen: boolean;
  open: (trigger: Reference, content: Reference, options?: PopoverOptions) => void;
  close: () => void;
  toggle: (trigger: Reference, content: Reference, options?: PopoverOptions) => void;
};

type PopoverOptions = {
  placement?: Placement;
  sameWidth?: boolean;
  sameHeight?: boolean;
};

type State = {
  isOpen: boolean;
  trigger: Reference;
  content: Reference;
  options?: PopoverOptions;
};

export const usePopover = (): PopoversCarrier => {
  const [state, setState] = useState<State>({ isOpen: false, trigger: null, content: null, options: undefined });

  useLayoutEffect(() => {
    if (state.isOpen && state.trigger?.current && state.content?.current) {
      if (state.options?.sameWidth) {
        state.content.current.style.minWidth = `${state.trigger.current.offsetWidth}px`;
      }
      if (state.options?.sameHeight) {
        state.content.current.style.minHeight = `${state.trigger.current.offsetHeight}px`;
      }
      createPopper(state.trigger.current, state.content.current, {
        placement: state.options?.placement || 'bottom',
      });
    }
  }, [state]);

  const open = (trigger: Reference, content: Reference, options?: PopoverOptions) => {
    setState({ isOpen: true, trigger, content, options });
  };

  const close = () => {
    setState({ isOpen: false, trigger: null, content: null, options: undefined });
  };

  const toggle = (trigger: Reference, content: Reference, options?: PopoverOptions) => {
    if (state.isOpen) close();
    else open(trigger, content, options);
  };

  const location = useLocation();
  useEffect(() => close(), [location]);

  return { isOpen: state.isOpen, open, close, toggle };
};
