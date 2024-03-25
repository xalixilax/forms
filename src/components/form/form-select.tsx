import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useEditForm } from "./edit-form";
import { DetailsInput, FormReturn, ReactHookForm } from "./forms";

interface FormSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    ReactHookForm {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder: string;
  reactHookForm: FormReturn;
}

/**
 * Full component for select containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the checkbox.
 * @param label Label for the checkbox.
 * @param options Options for the select.
 * @param placeholder Placeholder for the select.
 * @returns
 */
export function FormSelect({
  name,
  label,
  options,
  placeholder,
  reactHookForm,
}: FormSelectProps) {
  const { isEditing } = useEditForm();

  return (
    <FormField
      control={reactHookForm.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isEditing ? (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{placeholder}</SelectLabel>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <DetailsInput value={field.value} />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
}
