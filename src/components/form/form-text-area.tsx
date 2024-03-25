import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useEditForm } from "./edit-form";
import { DetailsInput, FormReturn, ReactHookForm } from "./forms";

interface FormTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    ReactHookForm {
  name: string;
  label: string;
  reactHookForm: FormReturn;
}

/**
 * Full component for text area containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the input.
 * @param label Label for the input.
 * @param placeholder Placeholder for the input.
 * @returns
 */
export function FormTextArea({
  className,
  name,
  label,
  reactHookForm,
  ...props
}: FormTextAreaProps) {
  const { isEditing } = useEditForm();


  return isEditing ? (
    <FormField
      control={reactHookForm.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isEditing ? (
              <Textarea {...props} {...field} />
            ) : (
              <DetailsInput value={field.value} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : <DetailsInput value={reactHookForm.getValues(name)} />;
}
