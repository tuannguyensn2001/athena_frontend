import { render } from '@testing-library/react';
import { CardClass } from '~/components/class/CardClass/index';

describe('CardClass', () => {
    it('should render title ', () => {
        const { getByText } = render(
            <CardClass id={'id'} title={'title'} imgSrc={'imgSrc'} />,
        );

        expect(getByText('title')).toBeInTheDocument();
    });

    it('should render id', () => {});

    it('should render image', () => {});
});
