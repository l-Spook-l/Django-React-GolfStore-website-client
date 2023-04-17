import React, { useContext, useState } from 'react'
import { Context } from '../../index'
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import MyModal from '../../components/UI/MyModal/MyModal'
import { observer } from 'mobx-react-lite'
import FormLogin from '../UI/FormLogin/FormLogin'
import FormRegister from '../UI/FormRegister/FormRegister'

// observer позволяет создавать компоненты, которые автоматически обновляются при изменении данных, отслеживаемых с помощью MobX.
const NavBar = observer(() => {
  const {user} = useContext(Context)

  /* Для модального окна */
  const [showModal, setShowModal] = useState(false)

  // Кнопка выхода из профиля
  const signIn = () => {
    user.setIsAuth(false)
  }
  //console.log(user.isAuth)
  
  /* ---------------------------------------------------- */
  const [showLogin, setShowLogin] = useState(true);

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  }
  // закрытие модального окна
  const modalClose = () => {
    setShowModal(false);
  }

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  }
  /* ---------------------------------------------------- */

  return (
    <div>
      {/* collapseOnSelect: сворачивает менб в одну кнопку при ширине (expand)
    expand: при какой ширине будет сворачиваться меню
    bg: атрибут задает фоновый цвет (background color) для навигационного меню. 
    variant: атрибут задает вариант (стиль) оформления навигационного меню. */}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {/* fluid указывает на то, что контейнер будет занимать всю доступную ширину родительского элемента. */}
      <Container fluid>
      {/* Навигаци вместо <a> */}
      <NavLink className="text-decoration-none text-light" to={'/'}>Spook Golf</NavLink>
      {/* Navbar.Toggle - Кнопка которая появиться при уменьшении экрана и вней будут эл-ты которы находять в блоке с нужным - id*/}
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      {/* если ширина маленькая, меню которое внутри этого блока, будет светнуто в кнопку) */}
      <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="ms-auto align-items-center">
          {/* Навигаци вместо <a> - react-router-dom*/}
          <NavLink className='text-muted text-decoration-none ms-2' to={'/'}>Home</NavLink>
          <NavLink className='text-muted text-decoration-none ms-2' to={'/users'}>Users</NavLink>
          <NavDropdown title="Example" >
            <NavDropdown.Item>
              <NavLink className='text-muted text-decoration-none ms-2 text-dark' to={"/counter"}>Counter</NavLink>
              <NavLink className='text-muted text-decoration-none ms-2 text-dark' to={"/counter"}>Counter</NavLink>
              <NavLink className='text-muted text-decoration-none ms-2 text-dark' to={"/counter"}>Counter</NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav >
          {user.isAuth 
          ? 
          <Button variant="primary" className="ms-2 me-2" onClick={signIn}>Sign in</Button>
          : 
          <Button variant="primary" className="ms-2 me-2" onClick={clickLogin}>Log in</Button>
          }
        </Nav>

      </Navbar.Collapse>
      </Container>
    </Navbar>

    <MyModal 
      showModal={showModal}
      setShowModal={modalClose} 
      title={showLogin ? 'Форма авторизации' : 'Форма регистрации'} >
        {showLogin 
        ? 
        <FormLogin onSwitchForm={handleSwitchForm} />
        :
        <FormRegister onSwitchForm={handleSwitchForm} />
        }
    </MyModal>

    </div>
  )
})

export default NavBar