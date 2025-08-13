import React from "react";
import { Button } from "@blueprintjs/core";

interface FieldProps {
  field: FieldPropsType;
  onEdit: (field: FieldPropsType) => void;
  onDelete: (id: string) => void;
}

interface FieldPropsType {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

const Field: React.FC<FieldProps> = ({ field, onEdit, onDelete }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{field.name}</strong>
        {field.required && <span style={{ color: "red" }}>*</span>}
        <br />
        <small>{field.type}</small>
      </div>
      <div>
        <Button icon="edit" minimal onClick={() => onEdit(field)} />
        &nbsp;
        <Button icon="trash" minimal intent="danger" onClick={() => onDelete(field.id)} />
      </div>
    </div>
  );
};

export default Field;