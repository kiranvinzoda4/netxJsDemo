import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure()

const options = {
    autoClose: 5000,
    className: '',
    position: toast.POSITION.TOP_RIGHT,
    transition: Slide,
};

export default alert = (message, type) => {
    switch (type) {
        case 'success':
            toast.success(message, options);
            break;

        case 'info':
            toast.info(message, options);
            break;

        case 'warning':
            toast.warning(message, options);
            break;

        case 'error':
            toast.error(message, options);
            break;

        default:
            toast.dark(message, options);
            break;
    }
}
