import { useEffect, useRef, useState } from 'react';

const baseURL = process.env.REACT_APP_API_URL;

const useRandomTip = (user) => {
  const [randomTip, setRandomTip] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const tipTextRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem('showRandomTip') === '1' && user?.userType === 'mentee';
    if (!shouldShow) return;

    const fetchRandomTip = async () => {
      try {
        const response = await fetch(`${baseURL}/api/tips/random`);
        if (!response.ok) throw new Error('Failed to fetch random tip');
        const data = await response.json();
        setRandomTip(data);
        setShowTip(true);
      } catch (_) {
        // ignore
      } finally {
        sessionStorage.removeItem('showRandomTip');
      }
    };

    fetchRandomTip();
  }, [user]);

  const closeTip = () => setShowTip(false);

  // Measure whether the preview text is truncated
  useEffect(() => {
    if (!showTip || !randomTip) return;
    const el = tipTextRef.current;
    if (!el) return;

    const measure = () => {
      try {
        const truncated = el.scrollHeight - el.clientHeight > 1;
        setIsTruncated(truncated);
      } catch (_) {}
    };

    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [showTip, randomTip]);

  useEffect(() => {
    // reset expanded state when tip changes or closes
    if (!showTip) setIsExpanded(false);
  }, [showTip, randomTip?._id]);

  const handleDetailsToggle = (event) => {
    setIsExpanded(Boolean(event?.target?.open));
  };

  return { randomTip, showTip, closeTip, tipTextRef, isTruncated, isExpanded, handleDetailsToggle };
};

export default useRandomTip;


