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
}
