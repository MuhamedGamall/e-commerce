//@ts-nocheck
import { Box, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormEditorProps } from './FormEditor.types';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useIntl } from 'react-intl';

 const toolbarItems = [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
      ]

export default function FormEditor({
  name,
  control,
  value,
  onChange,
  disabled = false,
  id,
  placeholder = 'Write something...',
  className = '',
  toolbar = toolbarItems,
  
}: IFormEditorProps) {
  const [isClient, setIsClient] = useState(false);
  const {locale} = useIntl();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const renderEditor = (value?: string, onChange?: (value: string) => void, error?: boolean, errorMessage?: string) => (
    <Box component="div" className={'form-editor ' + className + (error ? ' error' : '')}>
      <CKEditor
        editor={ClassicEditor as any}
        data={value || ''}
        disabled={disabled}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange?.(data);
        }}
        
        id={id}
        config={{
          ...(toolbar.length > 0 ? {toolbar:{items:toolbar}} : {}),
          language: locale,
          placeholder,
        }}
      />
      <FormHelperText variant="filled" sx={{ color: '#DC362E' }} error={error}>
        {errorMessage}
      </FormHelperText>
    </Box>
  );
  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        renderEditor(field.value, field.onChange, !!fieldState.error, fieldState.error?.message)
      }
    />
  ) : (
    renderEditor(value, onChange)
  );
}
