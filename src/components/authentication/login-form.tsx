import { FC } from 'react'
import { useForm } from "react-hook-form";

export interface ILoginFormData {
    email: string;
    password: string;
}

export interface ILoginFormProps {
    onSubmit: (data: ILoginFormData) => void
}

export const LoginForm: FC<ILoginFormProps> = ({onSubmit}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>({defaultValues: {email: '', password: ''}});
    
    return (
        <div>
            <form className="flex flex-col justify-between h-60 " onSubmit={handleSubmit((data) => onSubmit(data))}>
                <input className="h-12 w-60 border-2 border-black" {...register('email', { required: true })} />

                <input className="h-12 w-60 border-2 border-black" {...register('password', { required: true })} />

                <input type="submit" className="border-2 border-black" />
            </form>
        </div>
    )
}
