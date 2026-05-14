type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
};

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}

export default InputField;