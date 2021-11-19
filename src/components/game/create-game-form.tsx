import { FC } from 'react';
import { useForm } from 'react-hook-form';

export interface CreateGameFormData {
  name: string;
  description: string;
  image: string;
}

export interface CreateGameFormProps {
  onSubmit?: (data: CreateGameFormData) => void;
}

export const CreateGameForm: FC<CreateGameFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateGameFormData>({ defaultValues: { name: null, description: null, image: null } });

  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <form className="mt-8"
                onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Nom de la partie*</span>
                    <input placeholder="" type="text"
                      className="text-md block px-3 py-2 rounded-lg w-full
                              bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus: focus: focus: focus: outline-none"
                      {...register('name', { required: true })} />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Description</span>
                    <textarea placeholder=""
                      className="text-md block px-3 py-2 rounded-lg w-full
                              bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus: focus: focus: focus: outline-none"
                      {...register('description')} />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Image de couverture*</span>
                    <input placeholder="" type="text"
                      className="text-md block px-3 py-2 rounded-lg w-full
                              bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus: focus: focus: focus: outline-none"
                      {...register('image')} />
                  </div>
                </div>
                <button type="submit" className="mt-3 text-lg font-semibold
                              bg-gray-800 w-full text-white rounded-lg
                              px-6 py-3 block shadow-xl hover:">
                  Créer une partie
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
