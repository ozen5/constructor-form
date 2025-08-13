import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";

interface Option {
  label: string;
  value: string;
}

interface InputModuleProps {
  name: string;
  label: string;
  placeholder?: string;
  type: string; 
  required: boolean;
  options?: Option[]; 
}

export const InputModule: React.FC<InputModuleProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  options = [
    { label: "Опция 1", value: "option1" },
    { label: "Опция 2", value: "option2" },
    { label: "Опция 3", value: "option3" },
  ],
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormGroup
      label={label}
      labelFor={name}
      helperText={errorMessage}
      intent={errorMessage ? Intent.DANGER : Intent.NONE}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === "list") {
            return (
              <select
                {...field}
                value={field.value || ""} 
                onChange={(e) => field.onChange(e.target.value)}
                id={name}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "white",
                  fontSize: "14px",
                }}
              >
                <option value="" disabled>
                  {placeholder || "Выберите значение"}
                </option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          }

          return (
            <InputGroup
              {...field}
              id={name}
              placeholder={placeholder}
              type={type === "number" ? "number" : "text"}
              intent={errorMessage ? Intent.DANGER : Intent.NONE}
              required={required}
            />
          );
        }}
      />
    </FormGroup>
  );
};