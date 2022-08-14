import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { IssueModel } from '../model/issue.model';
import * as Yup from 'yup';

interface UpdateIssueModalProps {
  className?: string;
  isOpen: boolean;
  handleClose(): void;
  data?: IssueModel;
  onSubmit(data: IssueModel): void;
}

export const UpdateIssueModal = (props: UpdateIssueModalProps) => {
  const { className = '', isOpen, handleClose, data, onSubmit } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const UpdateFormSchema = Yup.object().shape({
    imageUri: Yup.string().required('Image uri is required'),
    title: Yup.string().required('Title is required'),
    issueNumber: Yup.string().required('Issue Number is required'),
    issueDate: Yup.string().required('Issue Date is required'),
  });

  const emptyData = {
    id: '',
    imageUri: '',
    title: '',
    issueDate: '',
    issueNumber: 0,
  };

  const formik = useFormik<IssueModel>({
    initialValues: data ? data : emptyData,
    onSubmit: onSubmit,
    validationSchema: UpdateFormSchema,
  });

  useEffect(() => {
    formik.resetForm({
      values: data || emptyData,
    });
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        handleClose();
      }}
      className={className}
      fullScreen={fullScreen}>
      <DialogTitle>{data ? 'Edit issue' : 'Add new issue'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="imageUri"
            label="Image Uri"
            fullWidth
            variant="standard"
            value={formik.values.imageUri}
            onChange={formik.handleChange}
            error={formik.touched.imageUri && Boolean(formik.errors.imageUri)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="issueNumber"
            label="Issue Number"
            type="number"
            fullWidth
            variant="standard"
            value={formik.values.issueNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.issueNumber && Boolean(formik.errors.issueNumber)
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="issueDate"
            label="Issue Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="standard"
            value={formik.values.issueDate}
            onChange={formik.handleChange}
            error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type={'submit'}>Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
