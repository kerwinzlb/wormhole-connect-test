import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from './Message';

const message = {
  success: (text: string, time: number) => {
    const JSXdom: JSX.Element = (
      <Message content={text} duration={time} type="success"></Message>
    );
    if (typeof window !== 'undefined') {
      const dom: HTMLDivElement = document.createElement('div');
      createRoot(dom).render(JSXdom);
      document.body.appendChild(dom);
    }
  },
  info: (text: string, time: number) => {
    const JSXdom: JSX.Element = (
      <Message content={text} duration={time} type="info"></Message>
    );
    if (typeof window !== 'undefined') {
      const dom: HTMLDivElement = document.createElement('div');
      createRoot(dom).render(JSXdom);
      document.body.appendChild(dom);
    }
  },
  error: (text: string, time: number) => {
    const JSXdom: JSX.Element = (
      <Message content={text} duration={time} type="error"></Message>
    );
    if (typeof window !== 'undefined') {
      const dom: HTMLDivElement = document.createElement('div');
      createRoot(dom).render(JSXdom);
      document.body.appendChild(dom);
    }
  },
  warning: (text: string, time: number) => {
    const JSXdom: JSX.Element = (
      <Message content={text} duration={time} type="warning"></Message>
    );
    if (typeof window !== 'undefined') {
      const dom: HTMLDivElement = document.createElement('div');
      createRoot(dom).render(JSXdom);
      document.body.appendChild(dom);
    }
  },
};

export default message;
