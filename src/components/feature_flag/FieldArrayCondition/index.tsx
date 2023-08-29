import {useFieldArray, useFormContext} from "react-hook-form";
import type {TargetGroupForm} from "~/types/feature_flag";
import {Button} from "antd";
import {FieldArrayConditionItem} from "~/components/feature_flag/FieldArrayConditionItem";

export function FieldArrayCondition() {

    const {control, resetField} = useFormContext<TargetGroupForm>();
    const {fields, append, remove} = useFieldArray({
        control: control,
        name: 'conditions'
    });

    const handleAddCondition = () => {
        append({
            condition_id: 0,
            operator_id: 0,
            name: ''
        })
    }
    return (
        <div>
            <div>
                {fields.map((field, index) => (
                    <div key={field.id} className={''}>
                        <FieldArrayConditionItem onRemove={remove} id={field.id} index={index}/>
                    </div>
                ))}
            </div>
            <div>
                <Button onClick={handleAddCondition}>Add condition</Button>
            </div>
        </div>
    )
}