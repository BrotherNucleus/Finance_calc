type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  className?: string;
  onChange?: (value: string) => void;
};

function InputField({label,type = "text",placeholder,value,onChange,className,}: InputFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type={type}
        min={type === "number" ? 0 : undefined}
        placeholder={placeholder}
        value={value ?? ""}
        className={className}
        onChange={(event) => {
          const value = event.target.value;

          if (type === "number" && Number(value) < 0) {
            return;
          }

          onChange?.(value);
        }}
      />
    </div>
  );
}

export default InputField;