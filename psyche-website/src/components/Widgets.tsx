"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation'; // ✅ RIGHT
import { FaArrowRight, FaBook, FaVideo, FaBug, FaGithub } from 'react-icons/fa';

export const Widgets: React.FC = () => {
    const router = useRouter();

  const lab1Progress = Number(localStorage.getItem('lab1Progress') || 0);
  const lab2Progress = Number(localStorage.getItem('lab2Progress') || 0);
  const [currentLab, setCurrentLab] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bugMessage, setBugMessage] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const labs = [
    {
      id: 1,
      title: 'Lab 1: ICMP Redirect Attack',
      progress: lab1Progress,
      route: '/Lab1',
    },
    {
      id: 2,
      title: 'Lab 2: Packet Sniffing',
      progress: lab2Progress,
      route: '/Lab2',
    },
  ];

  const lab = labs.find((l) => l.id === currentLab);

  const allActivities = useMemo(() => [
    '✅ Completed Lab 1',
    '🕒 Continued Lab 2',
    '📥 Downloaded Packet Sniffer Kit',
    '🧪 Finished Lab 1 - Section 1',
    '🔄 Updated First Name in Profile',
    '🛠️ Added Skill: Penetration Testing',
    '💻 Selected Kali Linux as a VM',
    '📧 Changed Email Address',
    '🧪 Started Lab 2 - Step 3',
    '📊 Adjusted Skill Level to Intermediate',
    '🎯 Completed Lab 2',
    '⚙️ Updated all skill preferences'
  ], []);

  const [visibleActivities, setVisibleActivities] = useState<string[]>([]);

  useEffect(() => {
    setVisibleActivities(allActivities.slice(0, 5));
    let pointer = 5;

    const interval = setInterval(() => {
      setVisibleActivities((prev) => {
        const nextIndex = pointer % allActivities.length;
        const nextVisible = [...prev.slice(1), allActivities[nextIndex]];
        pointer++;
        return nextVisible;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [allActivities]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLab((prev) => (prev % labs.length) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [labs.length]);

  const handleBugSubmit = () => {
    alert(`🐞 Thanks for your feedback:\n\n${bugMessage}`);
    setBugMessage('');
    setIsChatOpen(false);
  };

  const startDrag = (e: React.MouseEvent) => {
    const box = chatRef.current;
    if (!box) return;
    pos.current.offsetX = e.clientX - box.getBoundingClientRect().left;
    pos.current.offsetY = e.clientY - box.getBoundingClientRect().top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };

  const drag = (e: MouseEvent) => {
    const box = chatRef.current;
    if (!box) return;
    const x = e.clientX - pos.current.offsetX;
    const y = e.clientY - pos.current.offsetY;
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) return null;


  return (
    <section className="dashboard-widgets">
      {/* Lab Progress Widget */}
      <div className="widget lab-widget">
        <div className="lab-progress-header">
          <h2>Lab Progress:</h2>
          <FaArrowRight className="next-lab-btn" onClick={() => setCurrentLab((prev) => (prev % labs.length) + 1)} />
        </div>
        <div className="lab-label">{lab?.title}</div>
        <div className="lab-progress-bar">
          <div
            className="lab-progress-fill"
            style={{ width: `${(lab?.progress || 0) / 7 * 100}%` }}
          />
          <span className="lab-progress-text">
            {lab && lab.progress >= 7 ? '✅ Completed!' : `${Math.round((lab?.progress || 0) / 7 * 100)}%`}
          </span>
        </div>
        <button className="lab-continue-button" onClick={() => lab && router.push(lab.route)}>
        Continue {lab?.title.split(':')[0]}
        </button>
      </div>

      {/* Recent Activity */}
      <div className="widget recent-activity">
        <h2>Recent Activity:</h2>
        <ul>
          {visibleActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>

      {/* System Status */}
      <div className="widget system-status">
        <h2>Sandbox Status:</h2>
        <p className="status-indicator"><span className="pulse-dot-online"></span> Kali : Online</p>
        <button onClick={() => window.open('http://72.209.113.80:6081/vnc.html', '_blank')}>Launch Kali Sandbox</button>
        <br /><br />
        <p className="status-indicator"><span className="pulse-dot-offline"></span> Ubuntu : Offline</p>
        <button onClick={() => window.open('http://72.209.113.80:6081/vnc.html', '_blank')}>Launch Ubuntu Sandbox</button>
      </div>

      {/* Quick Links */}
      <div className="widget quick-links">
        <h2>Resources:</h2>
        <ul>
          <li>
            <a className="unstyled-link" href="https://seedsecuritylabs.org/labs.html" target="_blank" rel="noopener noreferrer">
              <FaBook /> Lab Guide PDF
            </a>
          </li>
          <li>
            <button className="unstyled-link" onClick={() => alert("🎥 The video walkthrough feature is coming soon!")}>
              <FaVideo /> Video: ICMP Walkthrough
            </button>
          </li>
          <li>
            <a className="unstyled-link" href="https://github.com/Capstone-Team-20/cyberpattern.github.io" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub Repository
            </a>
          </li>
          <li>
            <button className="unstyled-link" onClick={() => setIsChatOpen(true)}>
              <FaBug /> Provide Feedback
            </button>
          </li>
        </ul>
      </div>

      {/* Chatbox Modal */}
      {isChatOpen && (
        <div className="chatbox-overlay">
          <div className="chatbox-popup" ref={chatRef} style={{ position: 'fixed', top: '20%', right: '40px' }}>
            <div className="chatbox-header" onMouseDown={startDrag}>
              <h4>🐞 Provide Feedback</h4>
            </div>
            <textarea
              rows={4}
              placeholder="Enter your feedback..."
              value={bugMessage}
              onChange={(e) => setBugMessage(e.target.value)}
            />
            <div className="chatbox-buttons">
              <button onClick={handleBugSubmit}>Submit</button>
              <button onClick={() => setIsChatOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
