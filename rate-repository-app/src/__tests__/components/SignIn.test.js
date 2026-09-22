import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const handleSubmit = jest.fn();
      const formik = {
        values: {
          username: '',
          password: '',
        },
        errors: {},
        touched: {},
        handleChange: jest.fn((field) => (text) => {}),
        handleBlur: jest.fn((field) => () => {}),
        handleSubmit: handleSubmit,
      };

      await render(<SignInContainer formik={formik} />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'kalle',
      );
      await fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password',
      );
      await fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});
