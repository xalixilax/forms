import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormCheckbox,
  FormInput,
  FormReturn,
  FormSelect,
  FormTextArea,
} from "@/components/form/forms";
import { AtSign, Pencil, Save, Trash, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditForm,
  EditFormButton,
  EditFormCancelButton,
  EditFormSubmitButton,
  useEditForm,
} from "@/components/form/edit-form";
import { cn } from "@/lib/utils";
import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const inlineFormSchema = z.object({
  checkbox: z.boolean(),
  input: z.string(),
});

const formSchema = z.object({
  // file: z
  //   .any()
  //   .refine((file) => file !== null, "Veuillez-sélectionner un fichier.")
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
  //   .refine(
  //     (file) => ACCEPTED_TYPES.includes(file?.type),
  //     "Seulement les fichiers xlsx sont acceptés."
  //   ),
  select: z.string().min(1, "Veuillez sélectionner une option."),
  textarea: z.string().min(1, "Veuillez remplir ce champ."),
  // checkbox: z.boolean(),
  input2: z.string().max(3, "Max 3").min(1, "Min 1"),
  inputComp: z.string(),
  selectComp: z.string(),
  inputRegex: z
    .string()
    .min(1, "Veuillez entrer un .")
    .regex(/^[0-9]{9}$/, " suivi de 9 chiffres."),
  objectElement: z.object({
    obj1: z.string(),
    obj2: z.string(),
  }),
  // arrayElement: z.array(inlineFormSchema),
});

const defaultValues = {
  file: null,
  select: "",
  checkbox: false,
  inputRegex: "",
  inputComp: "",
  selectComp: "",
  objectElement: {
    obj1: "",
    obj2: "",
  },
  arrayElement: [
    {
      checkbox: false,
      input: "",
    },
  ],
  input2: "",
};

export function Home2() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // function onSubmit(values: ObjectType) {
  //   // Form data est nécessaire pour envoyé un fichier en POST.
  //   const formData = new FormData();
  //   formData.append("file", values.file);

  //   console.log(values);
  // }
  const [direction, setDirection] = React.useState<"horizontal" | "vertical">(
    "vertical"
  );
  const [variant, setVariant] = React.useState<"outline" | "ghost">("outline");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example form</CardTitle>
        <CardDescription>
          <Button
            onClick={() =>
              setDirection(
                direction === "horizontal" ? "vertical" : "horizontal"
              )
            }
          >
            Orientation
          </Button>
          <Button
            onClick={() =>
              setVariant(variant === "outline" ? "ghost" : "outline")
            }
          >
            Line
          </Button>
          This is an example form with all the components.
          <ButtonGroup
            orientation={direction}
            variants={"line"}
            className="my-4"
          >
            <Button variant={variant} className="w-[90px]">
              Button
            </Button>
            <Button variant={variant} className="w-[90px]">
              Button
            </Button>
            <Button variant={variant} className="w-[90px]">
              Button
            </Button>
          </ButtonGroup>
          <ButtonGroup
            orientation={direction}
            variants={"line"}
            className="my-4"
          >
            <Button variant={"default"} className="w-[50px]">
              <AtSign />
            </Button>
            <Input className="w-[220px]" />
          </ButtonGroup>
          <ButtonGroup
            orientation={direction}
            variants={"line"}
            className="my-4"
          >
            <Button variant={"outline"} className="w-[70px]">
              Fruits
            </Button>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ButtonGroup>
          <ButtonGroup
            orientation={direction}
            variants={"line"}
            className="my-4"
          >
            <Button variant={"outline"} className="">
              Fruits
            </Button>
            <Input placeholder="I am an input..." className="" />
            <Button variant={"outline"} className="">
              Fruits
            </Button>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant={"default"} className="">
              Fruits
            </Button>
          </ButtonGroup>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <EditForm form={form}>
          <FormButtons />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name={"select"}
              label={"Select Options"}
              placeholder={"Options"}
              reactHookForm={form}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
                { label: "Option 4", value: "4" },
              ]}
            />
            {/* <FormCheckbox name={"checkbox"} label={"Checkbox"} /> */}
            {/* <FormTest /> */}
            <FormInput
              name={"inputRegex"}
              label={"Input Regex"}
              placeholder={"Value"}
              reactHookForm={form}
            />
            <FormInput
              name={"objectElement.obj1"}
              label={"Object 1"}
              placeholder={"objectElement.obj1"}
              reactHookForm={form}
            />
            <FormInput
              name={"objectElement.obj2"}
              label={"Object 1"}
              placeholder={"objectElement.obj2"}
              reactHookForm={form}
            />
            <FormInput
              name={"input2"}
              label={"BLAHHAHA 1"}
              placeholder={"Object"}
              reactHookForm={form}
            />
            <FormTextArea
              name={"textarea"}
              label={"Textarea"}
              placeholder={"Écrire quelque chose..."}
              reactHookForm={form}
            />
            {/* <FormInline reactHookForm={form} /> */}
            {/* <FormField
              name="file"
              render={({ field: { ref, name, onChange } }) => (
                <FormItem>
                  <FormLabel>Fichier</FormLabel>
                  <FormControl>
                    <Input
                      id="file"
                      type="file"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      ref={ref}
                      name={name}
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <Button type="submit">{"Submit"}</Button> */}
          </div>
        </EditForm>
      </CardContent>
    </Card>
  );
}

function FormButtons() {
  const { isEditing } = useEditForm();
  return (
    <ButtonGroup variants={"line"}>
      {isEditing && (
        <EditFormCancelButton variant="ghost" size={"icon"}>
          <X strokeWidth={1.75} className="text-muted-foreground" />
        </EditFormCancelButton>
      )}
      {isEditing ? (
        <EditFormSubmitButton variant="ghost" size={"icon"}>
          <Save strokeWidth={1.75} className="text-muted-foreground" />
        </EditFormSubmitButton>
      ) : (
        <EditFormButton variant="ghost" size={"icon"}>
          <Pencil strokeWidth={1.75} className="text-muted-foreground" />
        </EditFormButton>
      )}
    </ButtonGroup>
  );
}

/**
 * Inline form example. Gonna be used for forms thats contains multiple
 * elements that could be repeatable.
 *
 * @returns
 */
export function FormInline({ reactHookForm }: { reactHookForm: FormReturn }) {
  const control = reactHookForm.control;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arrayElement",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horses</CardTitle>
        <CardDescription>Inline</CardDescription>
      </CardHeader>
      <CardContent>
        {fields.map((item, index: number) => {
          return (
            <Card>
              <CardContent key={item.id}>
                <FormInput
                  name={`arrayElement.${0}.input`}
                  label={"Input"}
                  placeholder={"Input"}
                  reactHookForm={reactHookForm}
                />
                <FormCheckbox
                  name={`arrayElement.${0}.checkbox`}
                  label={"Checkbox"}
                  reactHookForm={reactHookForm}
                />
                <Button
                  variant={"destructive"}
                  onClick={() => remove(index)}
                  className="flex justify-center items-center self-center"
                >
                  <Trash className="w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => {
            append({ checkbox: false, input: "" });
          }}
        >
          append
        </Button>
      </CardFooter>
    </Card>
  );
}

// function FormTest() {
//   const {watch} = useCustomForm();
//   const [checkbox, setCheckBox] = useState(false);

//   // Callback version of watch.  It's your responsibility to unsubscribe when done.
//   useEffect(() => {
//     const subscription = watch((value, { name, type }) => {
//       console.log('changement',value, name, type)
//       setCheckBox(value.checkbox)
//     }
//     )
//     return () => subscription.unsubscribe()
//   }, [watch])
// }

const buttonGroupVariants = cva(
  "flex [&>*:not(:last-child):not(:first-child)]:rounded-none",
  {
    variants: {
      orientation: {
        horizontal:
          "flex-row [&>*]:-mr-[1px] [&>*:first-child:not(:last-child)]:rounded-e-none [&>*:last-child:not(:first-child)]:rounded-s-none",
        vertical:
          "flex-col [&>*]:-mb-[1px] [&>*:first-child:not(:last-child)]:rounded-b-none [&>*:last-child:not(:first-child)]:rounded-t-none",
      },
      variants: {
        line: "[&.flex-row>*:not(:first-child)]:border-s [&.flex-col>*:not(:first-child)]:border-t",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);
z;

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, variants, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        buttonGroupVariants({
          orientation,
          variants,
          className,
        })
      )}
      {...props}
    />
  )
);
ButtonGroup.displayName = "ButtonGroup";
