import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Skeleton } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
    createSearchParams,
    Link,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { Permission } from '~/components/system/Permission';
import { CardWorkshop } from '~/components/workshop/CardWorkshop';
import API from '~/config/network';
import type { IWorkshop } from '~/models/IWorkshop';
import type { ApiError, AppResponse } from '~/types/app';

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
    const isShow = searchParams.get('is_show') !== 'false';

    const { control, handleSubmit } = useForm<FormType>({
        defaultValues: {
            name: searchParams.get('name') || '',
            order: (searchParams.get('order') as Order) || null,
        },
    });
    const navigate = useNavigate();
    const { data, isLoading } = useQuery<AppResponse<IWorkshop[]>, ApiError>({
        queryKey: [
            'workshops-own',
            searchParams.get('name'),
            searchParams.get('order'),
            searchParams.get('is_show'),
        ],
        queryFn: async () => {
            const response = await API.get('/api/v1/workshops/own', {
                params: {
                    name: searchParams.get('name') || null,
                    order: (searchParams.get('order') as Order) || null,
                    is_show: isShow,
                },
            });
            return response.data;
        },
    });

    const submit = (data: FormType) => {
        if (data?.name) searchParams.set('name', data.name);

        if (data?.order) {
            searchParams.set('order', data.order);
        }

        navigate({
            pathname: '/workshops',
            search: `?${createSearchParams(searchParams)}`,
        });
    };

    const handleClickChangeModeShow = (is_show = true) => {
        searchParams.set('is_show', is_show.toString());

        navigate({
            pathname: '/workshops',
            search: `?${createSearchParams(searchParams)}`,
        });
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <div className={'tw-mt-5 tw-justify-between tw-flex'}>
                <div className={'tw-flex tw-gap-5'}>
                    <div>
                        <Button
                            onClick={() => handleClickChangeModeShow(true)}
                            type={isShow ? 'primary' : 'default'}
                        >
                            Lớp của bạn
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={() => handleClickChangeModeShow(false)}
                            type={!isShow ? 'primary' : 'default'}
                        >
                            Lớp đã ẩn
                        </Button>
                    </div>
                </div>
                <div>
                    <Permission role={'teacher'}>
                        <Link to={'/workshops/create'}>
                            <Button icon={<PlusOutlined />}>Tạo lớp học</Button>
                        </Link>
                    </Permission>
                    <Permission role={'student'}>
                        <Link to={'/workshops/find'}>
                            <Button>Tìm lớp học</Button>
                        </Link>
                    </Permission>
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

            <div>
                <div className="tw-grid-cols-4 tw-grid tw-gap-5">
                    {!isLoading &&
                        data?.data?.map((item) => (
                            <CardWorkshop {...item} key={item.id} />
                        ))}
                    {isLoading &&
                        [1, 2, 3, 4].map((item) => (
                            <Skeleton key={item} active />
                        ))}
                </div>
            </div>
        </div>
    );
}
