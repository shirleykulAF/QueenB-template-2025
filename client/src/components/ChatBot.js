import React, { useState } from 'react';
import axios from 'axios';

function ChatBot() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	async function handleSend(e) {
		e && e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || isSending) return;

		const newMessages = [...messages, { role: 'user', text: trimmed }];
		setMessages(newMessages);
		setInput('');
		setIsSending(true);

		try {
			const res = await axios.post('/api/chat', { message: trimmed });
			const botText = res?.data?.reply || 'Sorry, I could not generate a response.';
			setMessages(prev => [...prev, { role: 'bot', text: botText }]);
		} catch (err) {
			setMessages(prev => [...prev, { role: 'bot', text: 'Error: failed to reach chat service.' }]);
		} finally {
			setIsSending(false);
		}
	}

	const toggleMinimize = () => {
		setIsMinimized(!isMinimized);
	};

	// Minimized floating icon
	if (isMinimized) {
		return (
			<div 
				onClick={toggleMinimize}
				style={{
					position: 'fixed',
					bottom: '16px',
					right: '16px',
					width: '60px',
					height: '60px',
					borderRadius: '50%',
					background: '#713062',
					color: 'white',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					boxShadow: '0 4px 16px rgba(30, 51, 40, 0.15)',
					zIndex: 1000,
					fontSize: '24px',
					fontWeight: 'bold',
					transition: 'all 0.3s ease'
				}}
				onMouseEnter={(e) => {
					e.target.style.transform = 'scale(1.1)';
					e.target.style.background = '#1E3328';
				}}
				onMouseLeave={(e) => {
					e.target.style.transform = 'scale(1)';
					e.target.style.background = '#713062';
				}}
			>
				💬
			</div>
		);
	}

	return (
		<div style={{
			maxWidth: 480,
			width: '100%',
			height: 420,
			border: '1px solid #ddd',
			borderRadius: 12,
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
			background: '#fff',
			boxShadow: '0 4px 16px rgba(30, 51, 40, 0.15)'
		}}>
			<div style={{
				padding: 12,
				borderBottom: '1px solid #eee',
				fontWeight: 600,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<span>QueenB ChatBot</span>
				<button
					onClick={toggleMinimize}
					style={{
						background: 'none',
						border: 'none',
						fontSize: '18px',
						cursor: 'pointer',
						color: '#666',
						padding: '4px',
						borderRadius: '4px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '24px',
						height: '24px'
					}}
					onMouseEnter={(e) => {
						e.target.style.background = '#f0f0f0';
						e.target.style.color = '#333';
					}}
					onMouseLeave={(e) => {
						e.target.style.background = 'none';
						e.target.style.color = '#666';
					}}
				>
					–
				</button>
			</div>
			<div style={{
				flex: 1,
				padding: 12,
				overflowY: 'auto',
				background: '#fafafa'
			}}>
				{messages.length === 0 && (
					<div style={{ color: '#888' }}>Say hi and ask a question…</div>
				)}
				{messages.map((m, idx) => (
					<div key={idx} style={{
						display: 'flex',
						justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
						marginBottom: 8
					}}>
						<div style={{
							maxWidth: '80%',
							padding: '8px 12px',
							borderRadius: 16,
							background: m.role === 'user' ? '#0057D9' : '#e9ecef',
							color: m.role === 'user' ? '#fff' : '#222',
							whiteSpace: 'pre-wrap'
						}}>
							{m.text}
						</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSend} style={{
				display: 'flex',
				gap: 8,
				padding: 12,
				borderTop: '1px solid #eee',
				background: '#fff'
			}}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your message..."
					style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
				/>
				<button
					type="submit"
					disabled={isSending || !input.trim()}
					style={{
						padding: '10px 14px',
						borderRadius: 8,
						border: 'none',
						background: isSending ? '#ccc' : '#1E3328',
						color: '#fff',
						cursor: isSending ? 'not-allowed' : 'pointer'
					}}
				>
					{isSending ? 'Sending...' : 'Send'}
				</button>
			</form>
		</div>
	);
}

export default ChatBot;


