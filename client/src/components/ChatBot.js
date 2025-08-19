import React, { useState } from 'react';
import axios from 'axios';

function ChatBot() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [isSending, setIsSending] = useState(false);

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
			background: '#fff'
		}}>
			<div style={{
				padding: 12,
				borderBottom: '1px solid #eee',
				fontWeight: 600
			}}>
				QueenB ChatBot
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
						background: isSending ? '#ccc' : '#1E3328', /* Changed to the exact dark green from image */
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


