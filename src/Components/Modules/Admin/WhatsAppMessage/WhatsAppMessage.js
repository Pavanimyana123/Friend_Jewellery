import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppMessage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-whatsapp', {
                to: phoneNumber,
                message: message
            });
            alert('Message Sent!');
        } catch (error) {
            alert('Error sending message');
        }
    };

    return (
        <div>
            <h2>Send WhatsApp Message</h2>
            <input 
                type="text" 
                placeholder="Enter phone number (e.g., +1234567890)" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
            />
            <textarea
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default WhatsAppMessage;
