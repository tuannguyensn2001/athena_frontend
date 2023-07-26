import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Login from '~/pages/login';

const mockUsedNavigate = vi.fn();
const mockUseParams = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockUsedNavigate,
    useParams: () => mockUseParams,
}));
// Tests
describe('Renders main page correctly', async () => {
    it('Should render the page correctly', async () => {
        render(<Login />);
    });
});
