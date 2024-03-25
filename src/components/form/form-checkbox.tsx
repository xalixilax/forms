import { Checkbox } from "@radix-ui/react-checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormReturn } from "./forms";

type FormCheckboxProps = {
  name: string;
  label: string;
  reactHookForm: FormReturn;
};

/**
 * Full component for checkbox containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the checkbox.
 * @param label Label for the checkbox.
 * @returns
 */
export function FormCheckbox({
  name,
  label,
  reactHookForm,
}: FormCheckboxProps) {
  return (
    <FormField
      control={reactHookForm.control}
      name={name}
      render={({ field: { ref, name, onChange, value } }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name}
                ref={ref}
                name={name}
                onCheckedChange={() => onChange(!value)}
              />
              <FormLabel htmlFor={name} className="ml-2" > 
                {label}
              </FormLabel>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
