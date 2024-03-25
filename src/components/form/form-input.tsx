import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEditForm } from "./edit-form";
import { DetailsInput, FormReturn, ReactHookForm } from "./forms";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    ReactHookForm {
  name: string;
  label: string;
  reactHookForm: FormReturn;
  isEdit?: boolean;
}

/**
 * Full component for input containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the input.
 * @param label Label for the input.
 * @param placeholder Placeholder for the input.
 * @returns
 */
export function FormInput({
  className,
  name,
  label,
  reactHookForm,
  ...props
}: FormInputProps) {
  const { isEditing } = useEditForm();

  return (
    <FormField
      control={reactHookForm.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isEditing ? (
              <Input {...props} {...field} />
            ) : (
              <DetailsInput value={field.value} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}