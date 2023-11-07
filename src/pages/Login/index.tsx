import { BiSolidUserCircle } from 'react-icons/bi';
import { GrFormViewHide, GrFormView } from 'react-icons/gr';
import { useState } from 'react';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import { login } from 'src/api';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [run, setRun] = useState('');

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.parentElement!.classList.add('focus', 'float');
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.parentElement!.classList.remove('focus');
    if (!event.target.value) {
      event.target.parentElement!.classList.remove('float');
    }
  };

  const handleRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRUN = event.target.value;
    const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
    setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    if (!run || !password) {
      toast.error('Asegúrese de llenar todos los campos');
      return;
    }
    login({ run, password: password.toString() })
      .then(res => {
        console.log(res.data);
        toast.success('Sesión iniciada');
      })
      .catch(err => toast.error(`${err.response.data.msg}`));
  };

  return (
    <main id="login-page">
      <div id="login-form">
        <img
          src={'/logoWeb.png'}
          alt="logo"
        />
        <form onSubmit={HandleSubmit}>
          <fieldset>
            <label htmlFor="run">Run</label>
            <input
              id="run"
              type="text"
              name="run"
              onChange={handleRUNChange}
              value={run}
              maxLength={12}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <BiSolidUserCircle className="biSolidUserRectangle" />
          </fieldset>

          <fieldset>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              maxLength={25}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <GrFormViewHide
              className={`grFormViewHide ${!showPassword ? 'show' : 'hide'}`}
              onClick={handleClickShowPassword}
            />
            <GrFormView
              className={`grFormView ${showPassword ? 'show' : 'hide'}`}
              onClick={handleClickShowPassword}
            />
          </fieldset>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
