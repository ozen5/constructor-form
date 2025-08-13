import React, { useState } from "react";
import { Button, Dialog } from "@blueprintjs/core";
import Field from "./Field";
import Preview from "./Preview";
import FieldEditor from "./FieldEditor";

interface FieldProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

const initialFields: FieldProps[] = [
  { id: "1", name: "Пример поля", type: "string", required: false },
];

const FormConstructor: React.FC = () => {
  const [fields, setFields] = useState<FieldProps[]>(initialFields);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<FieldProps | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false); 


  const handleAddField = () => {
    const newField: FieldProps = {
      id: String(Date.now()),
      name: "Новое поле",
      type: "string",
      required: false,
    };
    setEditingField(newField);
    setIsCreating(true); 
    setShowEditor(true);
  };


  const handleEditField = (field: FieldProps) => {
    setEditingField(field);
    setIsCreating(false); 
    setShowEditor(true);
  };


  const handleSaveField = (updatedField: FieldProps) => {
    if (isCreating) {
 
      setFields([...fields, updatedField]);
    } else {

      setFields(
        fields.map((field) => (field.id === updatedField.id ? updatedField : field))
      );
    }
    setShowEditor(false);
    setIsCreating(false);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Форма</h3>
        <Button intent="success" onClick={handleAddField}>
          + Добавить поле
        </Button>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
        {fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            onEdit={() => handleEditField(field)}
            onDelete={handleDeleteField}
          />
        ))}
      </div>

      <Preview fields={fields} />

      {showEditor && (
        <Dialog
          isOpen={true}
          title="Настройка поля"
          onClose={() => setShowEditor(false)}
          canOutsideClickClose={false}
          style={{ width: "400px" }}
        >
          <FieldEditor
            field={editingField!}
            onSave={handleSaveField}
            onCancel={() => setShowEditor(false)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default FormConstructor;