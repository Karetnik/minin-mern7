import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useAuth} from "../hooks/auth.hook";

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const {loading, error, request, clearError} = useHttp()
  const message = useMessage()
  const {login} = useAuth()

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    const data = await request('/api/auth/register', 'POST', {...form})
    message(data.message)
  }

  const loginHandler = async () => {
    const data = await request('/api/auth/login', 'POST', {...form})
    login(data.token, data.userId)
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Сократи Ссылку</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input className="white-text"
                       placeholder="Введите email"
                       id="email"
                       type="text"
                       name="email"
                       value={form.email}
                       onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input className="white-text"
                       placeholder="Введите пароль"
                       id="password"
                       type="text"
                       name="password"
                       value={form.password}
                       onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={loading}
              style={{marginRight: 10}}
              onClick={loginHandler}>
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
              >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
