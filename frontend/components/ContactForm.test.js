import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)

    const header = screen.getByText('Contact Form')
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, '123');

    const errorMessage = await screen.findAllByTestId('error')

    expect(errorMessage).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitBtn = screen.queryByRole('button');
    userEvent.click(submitBtn);

    const errorMessages = await screen.findAllByTestId('error');

    expect (errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'KalebG');

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Lundquist');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.getAllByTestId('error');

    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'Lundquist');

    const errorMess = await screen.findByText("Error: email must be a valid email address.");

    expect(errorMess).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const lastNameError = await screen.findByText("Error: lastName is a required field.");

    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);

    const lastNameInput = screen.getByLabelText(/Last Name*/i);

    const emailInput = screen.getByLabelText(/Email*/i);

    userEvent.type(firstNameInput, 'Kaleb');
    userEvent.type(lastNameInput, 'Lundquist');
    userEvent.type(emailInput, 'kalebglundquist@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText('Kaleb');
        const lastNameDisplay = screen.queryByText('Lundquist');
        const emailDisplay = screen.queryByText('kalebglundquist@gmail.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    
});
