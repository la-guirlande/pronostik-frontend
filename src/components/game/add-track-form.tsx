import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export interface AddTrackFormData {
  name: string;
  artists: { name: string }[];
}

export interface AddTrackFormProps {
  onSubmit?: (data: AddTrackFormData) => void;
}

export const AddTrackForm: FC<AddTrackFormProps> = ({ onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<AddTrackFormData>({ defaultValues: { name: '', artists: [{ name: '' }] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'artists' });

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(data => onSubmit(data))}>
      <label htmlFor="nameInput">Nom du son</label>
      <input id="nameInput" type="text" className="border" {...register('name')} />
      {fields.map((field, i) => (
        <div key={i}>
          <label htmlFor={`artistInput${i}`}>Artiste</label>
          <input id={`artistInput${i}`} type="text" name={`artists[${i}]`} className="border" {...register(`artists.${i}.name` as const)} />
          <button type="button" className="p-2 bg-red-500" onClick={() => remove(i)}>Supprimer</button>
        </div>
      ))}
      <button type="button" className="p-2 bg-green-500" onClick={() => append({ name: '' })}>Ajouter un artiste</button>
      <button type="submit" className="p-2 bg-blue-500">Ajouter une nouvelle track</button>
    </form>
  );
}