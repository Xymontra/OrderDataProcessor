function processOrderData() {
    let orderData = document.getElementById('orderData').value.trim();
    let delimiter = document.getElementById('useDelimiter').checked ? document.getElementById('delimiter').value : '|';
    let useServiceNumber = document.getElementById('useServiceNumber').checked;
    let serviceNumber = document.getElementById('serviceNumber').value.trim();
    let lines = orderData.split('\n');
    let processedLines = [];

    clearMessages();  // Clear previous messages

    if (!orderData) {
        showError('No order data provided.');
        return;
    }

    lines.forEach(line => {
        let fields = line.split('\t');
        if (fields.length < 7) {
            return;  // Skip invalid lines
        }
        let link_or_username = fields[5];
        let start_count = fields[6].trim();
        let order_quantity = fields[7].trim();

        // Extract numbers
        let counts = (fields[6] + ' ' + fields[7]).match(/\d+/g) || [];
        if (counts.length >= 2) {
            order_quantity = counts[1];  // Second number is order quantity
        } else if (counts.length === 1) {
            order_quantity = counts[0];  // Single number is order quantity
        } else {
            order_quantity = '0';  // No numbers, set order quantity to 0
        }

        let processedLine = `${delimiter} ${link_or_username} ${delimiter} ${order_quantity}`;
        if (useServiceNumber && serviceNumber) {
            processedLine = `${serviceNumber} ${processedLine}`;
        }

        processedLines.push(processedLine);
    });

    if (processedLines.length === 0) {
        showError('No valid order data found.');
        return;
    }

    document.getElementById('result').innerText = processedLines.join('\n');
    document.getElementById('copyButton').style.display = 'inline-block'; // Show the copy button
}

function copyToClipboard() {
    const resultElement = document.getElementById('result');
    const text = resultElement.innerText;

    if (!navigator.clipboard) {
        // Clipboard API not available
        fallbackCopyTextToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard successfully!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        showNotification('Copied to clipboard successfully!');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);  // Hide notification after 3 seconds
}

function showError(message) {
    const error = document.getElementById('error');
    error.innerText = message;
    error.style.display = 'block';

    setTimeout(function() {
        error.style.display = 'none';
    }, 3000);  // Hide error after 3 seconds
}

function clearMessages() {
    const notification = document.getElementById('notification');
    const error = document.getElementById('error');
    notification.style.display = 'none';
    error.style.display = 'none';
}

function toggleServiceNumber() {
    const useServiceNumber = document.getElementById('useServiceNumber').checked;
    const serviceNumberContainer = document.getElementById('serviceNumberContainer');
    if (useServiceNumber) {
        serviceNumberContainer.style.display = 'block';
    } else {
        serviceNumberContainer.style.display = 'none';
    }
}

function toggleDelimiter() {
    const useDelimiter = document.getElementById('useDelimiter').checked;
    const delimiterContainer = document.getElementById('delimiterContainer');
    if (useDelimiter) {
        delimiterContainer.style.display = 'block';
    } else {
        delimiterContainer.style.display = 'none';
    }
}
