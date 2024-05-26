function processOrderData() {
    let orderData = document.getElementById('orderData').value;
    let delimiter = document.getElementById('delimiter').value || '|';
    let lines = orderData.split('\n');
    let processedLines = [];

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

        processedLines.push(`${delimiter} ${link_or_username} ${delimiter} ${order_quantity}`);
    });

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
