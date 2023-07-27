import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Login } from '~/pages/login/Login';

const mockUsedNavigate = vi.fn();
const mockUseParams = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockUsedNavigate,
    useParams: () => mockUseParams,
}));
// Tests
describe('Renders main page correctly', async () => {
    it('Should render the page correctly', async () => {
        const { getByTestId } = render(<Login />);

        const button = getByTestId('submit-button');
        fireEvent.click(button);

        await waitFor(() =>
            expect(mockUsedNavigate).toBeCalledWith('/login/student'),
        );
    });
});
