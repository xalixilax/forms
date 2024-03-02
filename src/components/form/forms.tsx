import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useEditForm } from "./EditForm";

export type FormReturn = UseFormReturn<
  FieldValue<FieldValues>,
  unknown,
  undefined
>;

type ReactHookForm = {
  reactHookForm: FormReturn;
};

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    ReactHookForm {
  name: string;
  label: string;
  reactHookForm: FormReturn;
  isEdit?: boolean;
}

interface FormTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    ReactHookForm {
  name: string;
  label: string;
  reactHookForm: FormReturn;
}

interface FormSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    ReactHookForm {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder: string;
  reactHookForm: FormReturn;
}

type FormCheckboxProps = {
  name: string;
  label: string;
  reactHookForm: FormReturn;
};

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

  return (
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
          <FormMessage data-testid={`${name}-error-data-testid`} />
        </FormItem>
      )}
    />
  );
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
          <FormMessage data-testid={`${name}-error-data-testid`} />
        </FormItem>
      )}
    />
  );
}

function DetailsInput({ value }: { value: string }) {
  return (
    <div className="flex h-10 w-full rounded-md text-sm ring-offset-background">
      <p className="mt-[2px] ml-[1px] text-gray-500">
        {value || "Nothing to show"}
      </p>
    </div>
  );
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
              <FormLabel htmlFor={name} className="ml-2">
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
