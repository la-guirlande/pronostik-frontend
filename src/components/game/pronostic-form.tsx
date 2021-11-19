import { FC } from 'react';
import { useForm } from 'react-hook-form';

export interface PronosticFormData {
  score: number;
}

export interface PronosticFormProps {
  onSubmit?: (data: PronosticFormData) => void;
}

export const PronosticForm: FC<PronosticFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PronosticFormData>({ defaultValues: { score: 0 } });

  return (
    <form className="flex space-x-2" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input type="number" min={0} max={10} className="w-8 border" {...register('score', { required: true, min: 0, max: 10 })} />
      <button type="submit" className="p-1 bg-gray-100 border rounded-md">Enregistrer</button>
    </form>
  );
}