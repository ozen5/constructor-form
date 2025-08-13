import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputModule } from "./InputModule";


interface FieldProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

const Preview: React.FC<{ fields: FieldProps[] }> = ({ fields }) => {
  const schemaObject = fields.reduce((acc, field) => {
    let fieldSchema = yup.string();

    if (field.required) {
      fieldSchema = fieldSchema.required(`${field.name} обязательно`);
    }

    if (field.minLength !== undefined) {
      fieldSchema = fieldSchema.min(field.minLength, `${field.name}: Минимум ${field.minLength} символов`);
    }

    if (field.maxLength !== undefined) {
      fieldSchema = fieldSchema.max(field.maxLength, `${field.name}: Максимум ${field.maxLength} символов`);
    }

    acc[field.id] = fieldSchema;
    return acc;
  }, {} as Record<string, any>); 

  const schema = yup.object().shape(schemaObject);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log("FormData:", data);
    alert("Форма успешно сохранена!");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Предварительный просмотр</h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <InputModule
              key={field.id}
              name={field.id}
              label={field.name}
              placeholder={field.placeholder}
              type={field.type}
              required={field.required}
            />
          ))}
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Сохранить
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Preview;