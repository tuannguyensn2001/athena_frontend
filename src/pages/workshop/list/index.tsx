import { Button, Form, Input, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import API from '~/config/network';

type Order =
    | 'name_asc'
    | 'name_desc'
    | 'created_at_asc'
    | 'created_at_desc'
    | null;

interface FormType {
    name: string;
    order: Order;
}

export function ListWorkshops() {
    const [searchParams] = useSearchParams();
    const { control, handleSubmit } = useForm<FormType>({
        defaultValues: {
            name: searchParams.get('name') || '',
            order: (searchParams.get('order') as Order) || null,
        },
    });
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: [
            'workshops-own',
            searchParams.get('name'),
            searchParams.get('order'),
        ],
        queryFn: async () => {
            const response = await API.get('/api/v1/workshops/own', {
                params: {
                    name: searchParams.get('name') || null,
                    order: (searchParams.get('order') as Order) || null,
                },
            });
            return response.data;
        },
        staleTime: Infinity,
    });

    const submit = (data: FormType) => {
        const query: [string, string][] = [['name', data.name]];

        if (data?.order) {
            query.push(['order', data.order]);
        }

        navigate({
            pathname: '/workshops',
            search: `?${createSearchParams(query)}`,
        });
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <div className={'tw-mt-5 tw-gap-5 tw-flex'}>
                <div>
                    <Button type={'primary'}>Lớp của bạn</Button>
                </div>
                <div>
                    <Button>Lớp đã ẩn</Button>
                </div>
            </div>

            <Form onFinish={handleSubmit(submit)} size={'large'}>
                <div className={'tw-grid tw-grid-cols-12 tw-gap-4 tw-mt-5'}>
                    <Controller
                        control={control}
                        name={'name'}
                        render={({ field }) => (
                            <Form.Item className={'tw-col-span-8'}>
                                <Input {...field} placeholder={'Tìm kiếm'} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        control={control}
                        name={'order'}
                        render={({ field }) => (
                            <Form.Item className={'tw-col-span-2'}>
                                <Select
                                    {...field}
                                    placeholder={'Sắp xếp'}
                                    options={[
                                        {
                                            value: 'name_asc',
                                            label: 'A-Z',
                                        },
                                        {
                                            value: 'name_desc',
                                            label: 'Z-A',
                                        },
                                        {
                                            value: 'created_at_desc',
                                            label: 'Mới nhất',
                                        },
                                        {
                                            value: 'created_at_asc',
                                            label: 'Cũ nhất',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        )}
                    />
                    <Button
                        htmlType={'submit'}
                        type={'primary'}
                        className={'tw-col-span-2'}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </Form>
        </div>
    );
}
