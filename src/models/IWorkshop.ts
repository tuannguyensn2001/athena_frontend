export type Subject =
    | 'math'
    | 'english'
    | 'physics'
    | 'chemistry'
    | 'biology'
    | 'literature'
    | 'history'
    | 'geography';

export type Grade = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export declare interface IWorkshop {
    id: number;
    name: string;
    thumbnail: string;
    private_code: string;
    approve_student: boolean;
    prevent_student_leave: boolean;
    approve_show_score: boolean;
    disable_newsfeed: boolean;
    limit_policy_teacher: boolean;
    subject: Subject;
    grade: Grade;
    is_show: boolean;
    created_at: number;
    updated_at: number;
}
