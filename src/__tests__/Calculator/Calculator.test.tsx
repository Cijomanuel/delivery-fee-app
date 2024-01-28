import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalculatorComponent from '../../components/Calculator/Calculator';


describe('Calculator Main Page Section', () => {
    test('renders Calculator Component with correct image source and alt text', () => {
        render(<CalculatorComponent />);

        // Finding the image element by data-test-id
        const imageElement = screen.getByTestId('woltDeliveryImage');

        // Checking if the image is rendered with the correct source and alt text
        expect(imageElement).toHaveAttribute('src', 'https://cdn.pixabay.com/photo/2023/02/21/05/47/rain-7803539_1280.jpg');
        expect(imageElement).toHaveAttribute('alt', 'Wolt delivery');
    });
});