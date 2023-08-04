import { Switch, Typography } from 'antd';

interface Props {
    label: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export function InputSwitch({ label, description, value, onChange }: Props) {
    return (
        <div>
            <div
                className="tw-flex tw-items-center tw-justify-between tw-cursor-pointer"
                onClick={() => onChange(!value)}
            >
                <div className="tw-font-bold">{label}</div>
                <div>
                    <Switch checked={value} onChange={onChange} />
                </div>
            </div>
            <Typography.Text>{description}</Typography.Text>
        </div>
    );
}
