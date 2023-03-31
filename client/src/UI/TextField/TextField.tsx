import React from "react";
interface ITeaxfield {
  fieldName?: string;
  fieldType: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}
const TextField = ({
  fieldName,
  fieldType,
  value,
  setValue,
  placeholder,
  className,
}: ITeaxfield) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="basis-2/5 ">
      {fieldName && (
        <p className="mb-1 ml-2 mt-2">
          {fieldName} <span className="text-[red]">*</span>
        </p>
      )}
      <input
        value={value}
        type={fieldType}
        onChange={changeValueHandler}
        maxLength={40}
        placeholder={placeholder}
        className={`${className} p-2 rounded-2xl outline-none`}
      />
    </div>
  );
};

export default TextField;
