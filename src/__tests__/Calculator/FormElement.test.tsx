import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormElementComponent from '../../components/Calculator/FormElement';


describe('FormElement Component Section (for user input and output display)', () => {

    describe('Basic user input validation test cases', () => {
        test('renders FormElement Component Section with correct title', () => {
            render(<FormElementComponent />);

            const headingElement = screen.getByText('Delivery Fee Calculator'); // Finding the h3 element
            expect(headingElement).toBeInTheDocument(); // Checking if the h3 element is present
        });
        
        test('handles cart value input correctly', () => {
            render(<FormElementComponent />);
        
            const textInput = screen.getByTestId('cartValue');
            fireEvent.change(textInput, { target: { value: '10' } }); // Performing user interactions using fireEvent
            expect(textInput).toHaveValue('10');
        });
        
        test('handles delivery distance input correctly', () => {
            render(<FormElementComponent />);
        
            const textInput = screen.getByTestId('deliveryDistance');
            fireEvent.change(textInput, { target: { value: '500' } }); // Performing user interactions using fireEvent
            expect(textInput).toHaveValue('500');
        });

        test('handles amount of items input correctly', () => {
            render(<FormElementComponent />);
        
            const textInput = screen.getByTestId('numberOfItems');
            fireEvent.change(textInput, { target: { value: '2' } }); // Performing user interactions using fireEvent
            expect(textInput).toHaveValue('2');
        });
        
        test('handles order time input correctly', () => {
            render(<FormElementComponent />);
        
            const dateTimeInput = screen.getByTestId('orderTime');
            fireEvent.change(dateTimeInput, { target: { value: '2023-02-01T12:00' } });
            expect(dateTimeInput).toHaveValue('2023-02-01T12:00');
        });
    });
    
    describe('Validation as per computation of Delivery Fee', () => {

        test('Compute Delivery Price correctly - Test 1 (Normal)', () => {
            render(<FormElementComponent />);
          
            // Find input elements using data-test-id
            const cartValueInput = screen.getByTestId('cartValue');
            const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
            const numberOfItemsInput = screen.getByTestId('numberOfItems');
            const orderTimeInput = screen.getByTestId('orderTime');
            const submitButton = screen.getByTestId('submitButton');
          
            // Perform user interactions using fireEvent
            fireEvent.change(cartValueInput, { target: { value: '20' } });
            fireEvent.change(deliveryDistanceInput, { target: { value: '900' } });
            fireEvent.change(numberOfItemsInput, { target: { value: '1' } });
            fireEvent.change(orderTimeInput, { target: { value: '2023-10-21T12:00' } });
            fireEvent.click(submitButton);
            const resultText = screen.queryByTestId('fee');
          
            // Check if the result is displayed correctly
            expect(resultText).toHaveValue("2");
        });

    
        test('Compute Delivery Price correctly - Test 2 (with cart value equal to 200)', () => {
            render(<FormElementComponent />);
        
            // Find input elements using data-test-id
            const cartValueInput = screen.getByTestId('cartValue');
            const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
            const numberOfItemsInput = screen.getByTestId('numberOfItems');
            const orderTimeInput = screen.getByTestId('orderTime');
            const submitButton = screen.getByTestId('submitButton');
        
            // Perform user interactions using fireEvent
            fireEvent.change(cartValueInput, { target: { value: '200' } });
            fireEvent.change(deliveryDistanceInput, { target: { value: '900' } });
            fireEvent.change(numberOfItemsInput, { target: { value: '1' } });
            fireEvent.change(orderTimeInput, { target: { value: '2023-10-21T12:00' } });
            fireEvent.click(submitButton);
            const resultText = screen.queryByTestId('fee');
        
            // Check if the result is displayed correctly
            expect(resultText).toHaveValue("0");
        });

        test('Compute Delivery Price correctly - Test 3', () => {
            render(<FormElementComponent />);
        
            // Find input elements using data-test-id
            const cartValueInput = screen.getByTestId('cartValue');
            const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
            const numberOfItemsInput = screen.getByTestId('numberOfItems');
            const orderTimeInput = screen.getByTestId('orderTime');
            const submitButton = screen.getByTestId('submitButton');
        
            // Perform user interactions using fireEvent
            fireEvent.change(cartValueInput, { target: { value: '20' } });
            fireEvent.change(deliveryDistanceInput, { target: { value: '900' } });
            fireEvent.change(numberOfItemsInput, { target: { value: '14' } });
            fireEvent.change(orderTimeInput, { target: { value: '2023-10-21T12:00' } });
            fireEvent.click(submitButton);
            const resultText = screen.queryByTestId('fee');
        
            // Check if the result is displayed correctly
            expect(resultText).toHaveValue("8.2");
        });
    });
});