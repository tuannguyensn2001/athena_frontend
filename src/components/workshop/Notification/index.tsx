import { useState } from 'react'
import { Button, Modal, Typography, Input } from 'antd'
import { 
    PlusOutlined,
    CloseOutlined
 } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'


type NotiProps = {
    contentNoti: string;
    timeNoti: string;
}

const today = new Date()
const currentTime = `${today.getDate()} tháng ${today.getMonth() + 1} lúc ${today.getHours()}:${today.getMinutes()}`
const notiArray:NotiProps[] = []

export function Notification() {
   
    const storedData = localStorage.getItem('notifications') 

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            contentNoti: '',
            timeNoti: ''
        }
    })

    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: 'Xoá thông báo',
            content: 'Học sinh sẽ không còn nhìn thấy thông báo này nữa ?',
            okText:'Đồng ý',
            cancelText: 'Thoát',
            onOk() {
            console.log('Xoá');
            
            },
            onCancel() {
            console.log('Thoát');
            },
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
 
    return (
       <div>
        
            <Typography.Title level={5} className='tw-font-semibold tw-text-lg'>Thông báo</Typography.Title>
            <Button
                type='primary' 
                icon={<PlusOutlined />} 
                className='tw-flex tw-items-center tw-justify-center tw-font-semibold tw-p-5 tw-w-full md:tw-w-72'
                onClick = {showModal}
            >
                Thêm thông báo
            </Button>
                    
            <Modal title="Thông báo sẽ được gửi đến các thành viên trong lớp" open={isModalOpen} centered closeIcon={null} footer={null}>
                <form onSubmit={handleSubmit((data) => {
                     
                    const savedData:NotiProps = {
                        contentNoti:data.contentNoti,
                        timeNoti: currentTime
                    }

                    notiArray.unshift(savedData)
                   
                    localStorage.setItem('notifications', JSON.stringify(notiArray))

                    reset()
                    
                })}>     
                    <Controller
                        name = 'contentNoti'
                        control = {control}
                        render={({field}) => (
                            <Input {...field} placeholder="Nội dung"/>
                        )}
                            
                    />
                    <div className='tw-flex tw-justify-end tw-mt-3'>
                        <Button className='tw-mr-2 tw-w-20 tw-font-semibold tw-bg-slate-200' onClick={handleCancel}>Huỷ</Button>
                        <Button 
                            htmlType="submit"
                            type='primary' 
                            className='tw-w-20 tw-font-semibold'
                            onClick={handleOk}
                        >
                            Tạo
                        </Button>
                    </div>
                </form>
            </Modal>
           
            {  
                (storedData) && JSON.parse(storedData).map((item:NotiProps, index:number) => (
                    
                    <div 
                        className='tw-mt-4 tw-bg-slate-100 tw-p-1 tw-rounded-md tw-w-full md:tw-w-72 tw-relative tw-flex tw-flex-col' 
                        style = {{borderLeft: '4px solid rgb(30, 136, 229)'}}
                        key={index}
                    >
                        <div className='tw-flex'>
                            <div>
                                <Typography>{item.contentNoti}</Typography>
                                <Typography className='tw-text-gray-600'>{item.timeNoti}</Typography>
                            </div>
                            
                                <CloseOutlined 
                                    className='tw-text-red-600 tw-text-xs tw-pt-1 tw-right-2.5 tw-absolute'
                                    onClick = {showDeleteConfirm}
                                />
                        </div>   
                    </div>
                )) 
            }
                   
        </div>        
    )
}
