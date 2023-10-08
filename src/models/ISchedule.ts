export declare interface ISchedule {
    id: number;
    name: string;
    channel: 'offline';
    start: number;
    minutes: number;
    status: 'pending';
    end?: number;
    workshop_id: number;
    created_by: number;
    deleted_at?: string;
    approve_update_status_automatically: boolean;
    parent_id: number;
    created_at: string;
    attendance_number: number;
    members_number: number;
}
