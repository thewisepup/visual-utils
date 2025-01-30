import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FileSizeErrorAlertProps {
  maxSizeMB: number;
}

export function FileSizeErrorAlert({ maxSizeMB }: FileSizeErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        File Upload Size Too Big {maxSizeMB}MB
      </AlertDescription>
    </Alert>
  );
}
