import React, { useState } from 'react';
import Navbar from '../../../Pages/Navbar/Navbar';
import './SendMessage.css';
import baseURL from '../../../../Url/NodeBaseURL';

function SendMessage() {
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [errors, setErrors] = useState({}); // Stores validation errors on submit

  const templates = {
    cust_reg:
      'Dear Customer, please complete your registration by clicking the link below: https://newfriendsjewellers.com/c-register',
    app_download:
      'Dear Customer, Please click on the link below to download the APK: 👉 https://newfriendsjewellers.com/login',
  };

  // Add a new phone number field
  const handleAddNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  // Remove phone number field
  const handleRemoveNumber = (index) => {
    if (phoneNumbers.length > 1) {
      const newNumbers = [...phoneNumbers];
      newNumbers.splice(index, 1);
      setPhoneNumbers(newNumbers);

      // Remove error for that index
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  // Handle input change and restrict to digits only
  const handleNumberChange = (index, value) => {
    // Allow only numbers
    const numericValue = value.replace(/\D/g, '');

    // Restrict to max 10 digits
    if (numericValue.length <= 10) {
      const newNumbers = [...phoneNumbers];
      newNumbers[index] = numericValue;
      setPhoneNumbers(newNumbers);
    }
  };

  // Handle template checkbox
  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    setMessage(templates[templateKey]);
  };

  // Handle custom message input
  const handleCustomMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Validate on submit
  const validateNumbers = () => {
    const newErrors = {};
    phoneNumbers.forEach((num, index) => {
      if (num.length !== 10) {
        newErrors[index] = 'Phone number must be exactly 10 digits';
      }
    });
    return newErrors;
  };

  // Send messages
  const handleSendMessages = async () => {
    setSendStatus('');
    const newErrors = validateNumbers();

    // If errors found, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSendStatus('Please correct the highlighted errors');
      return;
    }

    setErrors({}); // Clear errors

    const validNumbers = phoneNumbers.filter((num) => num.trim() !== '');
    if (validNumbers.length === 0) {
      setSendStatus('Please add at least one phone number');
      return;
    }

    if (!message.trim()) {
      setSendStatus('Please select a template or write a custom message');
      return;
    }

    setIsSending(true);
    setSendStatus('Sending messages...');

    try {
      const response = await fetch(`${baseURL}/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumbers: validNumbers,
          message: message,
          template: selectedTemplate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSendStatus(`Messages sent successfully to ${data.sentCount} numbers`);
        setPhoneNumbers(['']);
        setSelectedTemplate('');
        setMessage('');
        setErrors({});
      } else {
        setSendStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setSendStatus('Failed to send messages. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="send-message-container">
        <h2>Send SMS Messages</h2>

        {/* Phone Numbers Section */}
        <div className="phone-numbers-section">
          <h3>Phone Numbers</h3>
          {phoneNumbers.map((number, index) => (
            <div key={index} className="number-input-group">
              <div className="input-wrapper">
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={number}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  className={`phone-input ${errors[index] ? 'error-input' : ''}`}
                  maxLength={10}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveNumber(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </div>
              {/* Error message below the input */}
              {errors[index] && (
                <div className="error-text-below">{errors[index]}</div>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddNumber} className="add-btn">
            + Add Another Number
          </button>
        </div>

        {/* Message Templates Section */}
        <div className="templates-section">
          <h3>Message Templates</h3>
          <div className="template-options">
            <label className="template-option">
              <input
                type="checkbox"
                checked={selectedTemplate === 'cust_reg'}
                onChange={() => handleTemplateChange('cust_reg')}
              />
              <span>Customer Registration</span>
            </label>
            {/* <label className="template-option">
              <input
                type="checkbox"
                checked={selectedTemplate === 'app_download'}
                onChange={() => handleTemplateChange('app_download')}
              />
              <span>App Download</span>
            </label> */}
          </div>
        </div>

        {/* Message Preview Section */}
        <div className="message-section">
          <h3>Message Preview</h3>
          <textarea
            value={message}
            onChange={handleCustomMessageChange}
            placeholder="Select a template or write your custom message"
            className="message-textarea"
            rows="4"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessages}
          disabled={isSending}
          className="send-btn"
        >
          {isSending ? 'Sending...' : 'Send Messages'}
        </button>

        {/* Status Message */}
        {sendStatus && <div className="status-message">{sendStatus}</div>}
      </div>
    </>
  );
}

export default SendMessage;
