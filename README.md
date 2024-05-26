# Order Data Processor

Order Data Processor is a web application designed to streamline the processing and formatting of order data. Users can input raw order information, and the application will extract key details such as order links, usernames, start counts, and quantities. The formatted results are displayed in a clear and organized manner. The application features a modern dark theme and is fully responsive, ensuring a great user experience on both desktop and mobile devices.

## Features

- Extracts and formats order data
- Dark theme for a modern look
- Responsive design for use on desktop and mobile devices

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need a web browser to run this project.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/OrderDataProcessor.git

2. Navigate to the project directory:
    cd OrderDataProcessor

3. Open index.html in your web browser to view the application.

### Usage

1. Open index.html in your web browser.
2. Paste your order data into the textarea.
3. Enter a delimiter (default is |).
4. Click the "Process" button to format the order data.
5. The formatted data will be displayed in the result section.

## Example

    Input data:
    12345678	87654321	johndoe	0.12345	0.67890	https://example.com/user/johndoe		150	250	Product A	Description	Completed	100	2024-01-01 12:00:00	Auto
    23456789	98765432	janedoe	1.23456	1.78901	https://example.com/user/janedoe		300	450	Product B	Description	Completed	200	2024-01-02 13:00:00	Auto

    Formatted output:
    | https://example.com/user/johndoe | 250
    | https://example.com/user/janedoe | 450


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to me at contact@xymontra.com.
