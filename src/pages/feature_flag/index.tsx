import { Tabs } from 'antd';
import { CustomAttribute } from '~/components/feature_flag/CustomAttribute';
import { TargetGroup } from '~/components/feature_flag/TargetGroup';

export function FeatureFlag() {
    return (
        <div className={'tw-container tw-mx-auto'}>
            <Tabs
                defaultActiveKey={'target_group'}
                items={[
                    {
                        key: 'feature_flag',
                        label: 'Feature Flag',
                        children: 'feature flag',
                    },
                    {
                        key: 'target_group',
                        label: 'Target Group',
                        children: <TargetGroup />,
                    },
                    {
                        key: 'custom_attribute',
                        label: 'Custom Attribute',
                        children: <CustomAttribute />,
                    },
                ]}
            />
        </div>
    );
}
