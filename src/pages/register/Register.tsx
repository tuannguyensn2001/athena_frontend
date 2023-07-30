import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Header from '~/components/auth/header';
import { STUDENT_LOGO, TEACHER_LOGO } from '~/define/auth';

function CardRole({
    logo,
    text,
    path,
}: {
    logo: string;
    text: string;
    path: string;
}) {
    return (
        <Link to={path} className={'tw-no-underline'}>
            <Card
                style={{ width: 240 }}
                hoverable
                cover={<img alt={'Logo'} src={logo} />}
            >
                <Card.Meta className={'tw-text-center'} title={text} />
            </Card>
        </Link>
    );
}

export function Register() {
    return (
        <div className={'tw-container tw-mx-auto'}>
            <Header />

            <div className={'tw-flex tw-justify-center'}>
                <div className="tw-flex tw-flex-col tw-justify-center">
                    <div>
                        <Typography.Title className={'tw-text-center'}>
                            ĐĂNG KÝ TÀI KHOẢN MỚI
                        </Typography.Title>

                        <div className="tw-flex tw-justify-center">
                            <Typography.Text className={'tw-text-center'}>
                                Chọn vai trò để tiếp tục
                            </Typography.Text>
                        </div>

                        <div className={'tw-flex tw-gap-20 tw-mt-12'}>
                            <CardRole
                                logo={STUDENT_LOGO}
                                text={'Tôi là học sinh'}
                                path={'/register/student'}
                            />
                            <CardRole
                                logo={TEACHER_LOGO}
                                text={'Tôi là giáo viên'}
                                path={'/register/teacher'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
