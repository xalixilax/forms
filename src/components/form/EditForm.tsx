import { Form } from "../ui/form";
import { createContext, useContext, useState } from "react";
import { FormReturn } from "./forms";
import { Button } from "../ui/button";

// type EditFormProps = {
//   children: React.ReactNode;
//   schema: FormSchema;
//   onSubmit: (values: z.infer<FormSchema>) => void;
//   defaultValues: z.infer<FormSchema>;
//   isEdit: boolean;
// };

const EditFormContext = createContext<EditFormContextProps | undefined>(
  undefined
);

interface EditFormContextProps {
  isEditing: boolean;
  startEditing: () => void;
  cancelEditing: () => void;
  saveChanges: () => void;
}

export function EditForm({
  children,
  form,
}: {
  children: React.ReactNode;
  form: FormReturn;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState(form.getValues());

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    form.reset(initialValues);
    setIsEditing(false);
  };

  const saveChanges = () => {
    console.log("saveChanges");
    setInitialValues(form.getValues());
    setIsEditing(false);
  };

  const contextValue: EditFormContextProps = {
    isEditing,
    startEditing,
    cancelEditing,
    saveChanges,
  };

  return (
    <EditFormContext.Provider value={contextValue}>
      <Button onClick={isEditing ? cancelEditing : startEditing}>Edit</Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveChanges)}
          className="grid grid-cols-2 gap-4"
        >
          {children}
          <Button type="button" onClick={() => console.log(form.getValues())}>
            check
          </Button>
          {isEditing && <Button type="submit">Save</Button>}
        </form>
      </Form>
    </EditFormContext.Provider>
  );
}

// export function EditForm({
//   children,
//   schema,
//   defaultValues,
//   onSubmit,
//   isEdit,
// }: EditFormProps) {
//   const form = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues,
//   });

//   return (
//     <EditFormContext.Provider value={form}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {children}
//         </form>
//       </Form>
//     </EditFormContext.Provider>
//   );
// }

export function useEditForm() {
  const context = useContext(EditFormContext);
  if (!context) {
    throw new Error("useEditForm must be used within an EditFormProvider");
  }
  return context;
}
