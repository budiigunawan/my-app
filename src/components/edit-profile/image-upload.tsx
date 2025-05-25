import {
  Button,
  FileUpload,
  Float,
  useFileUploadContext,
} from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

const ImagePreview = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export const ImageUpload = () => {
  return (
    <FileUpload.Root accept="image/*">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="ghost" size="sm" textDecoration={'underline'}>
          Upload Image
        </Button>
      </FileUpload.Trigger>
      <ImagePreview />
    </FileUpload.Root>
  );
};
