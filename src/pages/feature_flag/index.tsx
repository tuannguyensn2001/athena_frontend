import {Tabs} from 'antd';
import {CustomAttribute} from "~/components/feature_flag/CustomAttribute";


export function FeatureFlag() {
    return (
        <div className={'tw-container tw-mx-auto'}>
            <Tabs
                defaultActiveKey={'custom_attribute'}
                items={[
                    {
                        key: 'feature_flag',
                        label: 'Feature Flag',
                        children: 'feature flag'
                    },
                    {
                        key: 'target_group',
                        label: 'Target Group',
                        children: 'target group'
                    },
                    {
                        key: 'custom_attribute',
                        label: 'Custom Attribute',
                        children: <CustomAttribute/>
                    }
                ]}
            />
        </div>
    )
}
