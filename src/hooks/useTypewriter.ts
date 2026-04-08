import { useState, useEffect } from 'react';

const TYPING_DURATION_MS = 140;
const DELETING_DURATION_MS = 80;
const PAUSE_AFTER_TYPED_MS = 1500;
const PAUSE_AFTER_DELETED_MS = 500;
const PAUSE_BETWEEN_CYCLES_MS = 2 * 60 * 1000;

function useTypewriter(text: string) {

  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {

    let timeout: ReturnType<typeof setTimeout>;

    if (waiting) {
      timeout = setTimeout(() => setWaiting(false), PAUSE_BETWEEN_CYCLES_MS);
    } else if (!deleting && displayed.length < text.length) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), TYPING_DURATION_MS);
    } else if (!deleting && displayed.length === text.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPED_MS);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), DELETING_DURATION_MS);
    } else {
      timeout = setTimeout(() => setWaiting(true), PAUSE_AFTER_DELETED_MS);
    }

    return () => clearTimeout(timeout);

  }, [displayed, deleting, waiting]);

  return { displayed: waiting ? text : displayed, waiting };
}

export default useTypewriter;
