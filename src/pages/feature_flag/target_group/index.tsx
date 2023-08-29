import {Button, Form} from "antd";
import {useEffect, useState} from "react";
import type {TargetGroupForm, TargetGroupFormAction} from "~/types/feature_flag";
import {ModalTargetGroup} from "~/components/feature_flag/ModalTargetGroup";
import {useForm, FormProvider, useWatch} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object<TargetGroupForm>().shape({
    name: yup.string().required(),
    target_object_id: yup.number().required(),
    conditions: yup.array().of(yup.object().shape({
        condition_id: yup.number().required(),
        operator_id: yup.number().required(),
        value: yup.string(),
        name: yup.string().required()
    }))
});

export function TargetGroup() {

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<TargetGroupFormAction>('create');
    const methods = useForm<TargetGroupForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            conditions: [],
            target_object_id: 0
        }
    });

    const targetObjectId = useWatch({
        control: methods.control,
        name: 'target_object_id'
    })

    useEffect(() => {
        console.log('change', targetObjectId)
        methods.resetField('conditions')
        // methods.trigger('conditions')
    }, [targetObjectId, methods.resetField, methods])


    const submit = (data: TargetGroupForm) => console.log(data)


    return (
        <div>
            <Button onClick={() => {
                setShowModal(true);
                setAction('create')
            }}>Create</Button>

            <FormProvider  {...methods}>
                <ModalTargetGroup onOk={submit} isOpen={showModal} onClose={() => setShowModal(false)} action={action}/>
            </FormProvider>


        </div>
    )
}