import { IFormFieldProps } from '../FormControl';
import { FormInput } from "../form-input";
import { FormOtp } from "../form-otp";
import { FormCheckbox } from "../form-checkbox";
import { FormSwitch } from "../form-switch";
import { FormRadio } from "../form-radio";
import { FormSelect } from "../form-select";
import { FormAttachment } from "../form-attachment";
import { FormDate } from "../form-date";
import { FormEditor } from '../form-editor';
import { FormDropzone, IFormDropzoneProps } from '../form-dropzone';

const FormField = (props: IFormFieldProps) => {
  const { type } = props;
  switch (type) {
    case "text":
    case "email":
    case "number":
    case "url":
    case "password":
      return <FormInput {...props} />;
    case "file":
      return <FormAttachment {...props} />;
    case "dropzone":
      return <FormDropzone {...props as IFormDropzoneProps} />;
    case "date":
      return <FormDate {...props} />;
    case "textarea":
      return <FormInput minRows={3} maxRows={5} multiline {...props}   sx={{ '.MuiOutlinedInput-root':{ height: "auto !important" }}} />;
    case "checkbox":
      return <FormCheckbox {...props} />;
    case "switch":
      return <FormSwitch {...props} />;
    case "radio":
      return <FormRadio {...props} />;
    case "otp":
      return <FormOtp {...props} />;
    case "select":
    return <FormSelect {...props} />;
      case "editor":
      return <FormEditor {...props} />;
        case "hidden":
      return <input {...props}  hidden />;
    default:
      return <FormInput {...props} />;

  }
};

export default FormField;

