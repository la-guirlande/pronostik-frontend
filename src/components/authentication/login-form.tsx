import { FC } from 'react'
import { useForm } from "react-hook-form";

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit: (data: ILoginFormData) => void
}

export const LoginForm: FC<ILoginFormProps> = ({ onSubmit }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>({ defaultValues: { email: '', password: '' } });

  return (
    <>
      <div className="container max-w-full mx-auto md:py-24 px-6">
        <div className="max-w-sm mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className="md:mt-6">
                <div className="text-center font-semibold text-black">
                  Pronostik
                </div>
                <div className="text-center font-base text-black">
                  Mandragora | Le 20.11.2021
                </div>
                <form className="mt-8"
                  x-data="{password: '',password_confirm: ''}" onSubmit={handleSubmit((data) => onSubmit(data))}>
                  <div className="mx-auto max-w-lg ">
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Email</span>
                      <input placeholder="" type="email"
                        className="text-md block px-3 py-2 rounded-lg w-full
                                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus: focus: focus: focus: outline-none"
                        {...register('email', { required: true })} />
                    </div>
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Mot de passe</span>
                      <input placeholder="" type="password" x-model="password"
                        className="text-md block px-3 py-2 rounded-lg w-full
                                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus: focus: focus: focus: outline-none"
                        {...register('password', { required: true })} />
                    </div>
                  </div>

                  <button type="submit" className="mt-3 text-lg font-semibold
                                bg-gray-800 w-full text-white rounded-lg
                                px-6 py-3 block shadow-xl hover:">
                    Se connecter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
