import React, { useState } from "react";
import { Button, InputGroup, Checkbox } from "@blueprintjs/core";

interface FieldProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

interface FieldEditorProps {
  field: FieldProps;
  onSave: (field: FieldProps) => void;
  onCancel: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onSave, onCancel }) => {
  const [name, setName] = useState(field.name || "");
  const [type, setType] = useState(field.type || "string");
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [required, setRequired] = useState(!!field.required);
  const [minLength, setMinLength] = useState(field.minLength || 1);
  const [maxLength, setMaxLength] = useState(field.maxLength || 255);

  const handleSave = () => {
    const updatedField: FieldProps = {
      id: field.id,
      name,
      type,
      placeholder,
      required,
      minLength,
      maxLength,
    };
    onSave(updatedField);
  };

  return (
    <div style={{ padding: "20px" }}>
      <label>
        Название поля
        <InputGroup
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Тип поля
        <select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "10px" }}
        >
          <option value="string">Строка</option>
          <option value="number">Число</option>
          <option value="list">Список</option>
        </select>
      </label>

      <label>
        Подсказка
        <InputGroup
          value={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceholder(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <Checkbox
        label="Обязательное поле"
        checked={required}
        onChange={(e) => setRequired(e.target.checked)}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>Мин. длина</label>
          <InputGroup
            value={String(minLength)}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinLength(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Макс. длина</label>
          <InputGroup
            value={String(maxLength)}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxLength(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button intent="primary" onClick={handleSave} fill>
          Сохранить
        </Button>
        <Button intent="danger" onClick={onCancel} fill>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default FieldEditor;