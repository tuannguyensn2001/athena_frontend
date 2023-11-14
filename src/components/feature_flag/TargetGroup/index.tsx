import { Button } from 'antd';
import { useToggle } from 'react-use';
import { ModalTargetGroup } from '~/components/feature_flag/ModalTargetGroup';

export function TargetGroup() {
    const [on, toggle] = useToggle(false);

    return (
        <div>
            <ModalTargetGroup open={on} onToggle={toggle} />

            <Button onClick={toggle}>Create</Button>
        </div>
    );
}
