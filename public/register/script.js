const register = () => {
  const userName = (inpName.value).trim()
  const userEmail = (inpEmail.value).trim().toLowerCase()
  const userPassword = inpPassword.value
  const userConfirmPassword = inpConfirmPassword.value
  
  if(!fieldValidation(userName, userEmail, userPassword, userConfirmPassword))
    return

  fetch("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName,
      userEmail,
      userPassword
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
      .then(json => {
        showToast("Conta cadastrada com sucesso! Faça login para acessá-la.", true)
        setTimeout(() => {
          window.location = "../login/index.html"
        }, 1500)
      })
    }
    else {
      return res.json().then(json => {
        showToast(json.message || "Erro no login.", false)
      })
    }
  })
  .catch(error => {
    console.error("Erro na requisição:", error)
    showToast(json.message || "Erro na conexão. Tente novamente.", false)
  })
}

function nameValidation (userName) {
  const outputTag = ["<span class='error'>", "</span>"]
  const nameErrorElement = errName
  nameErrorElement.innerHTML = ""

  if (!userName) {
    nameErrorElement.innerHTML = outputTag[0] + "Preencha o seu nome" + outputTag[1]
    return false
  } else if (userName.length < 3) {
    nameErrorElement.innerHTML = outputTag[0] + "No mínimo 3 caracteres" + outputTag[1]
    return false
  }
  return true
}

function emailValidation (userEmail) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
  const outputTag = ["<span class='error'>", "</span>"]
  const emailErrorElement = errEmail
  emailErrorElement.innerHTML = ""

  if (!userEmail) {
    emailErrorElement.innerHTML = outputTag[0] + "Preencha o seu email" + outputTag[1]
    return false
  } else if (!emailRegex.test(userEmail)) {
    emailErrorElement.innerHTML = outputTag[0] + "Email inválido" + outputTag[1]
    return false
  }
  return true
}

function passwordValidation (userPassword) {
  const outputTag = ["<span class='error'>", "</span>"]
  const passwordErrorElement = errPassword
  passwordErrorElement.innerHTML = ""

  if (!userPassword) {
    passwordErrorElement.innerHTML = outputTag[0] + "Preencha a sua senha" + outputTag[1]
    return false
  } else if (userPassword.length < 6) {
    passwordErrorElement.innerHTML = outputTag[0] + "No mínimo 6 caracteres" + outputTag[1]
    return false
  }
  return true
}

function confirmPasswordValidation (userPassword, userConfirmPassword) {
  const outputTag = ["<span class='error'>", "</span>"]
  const confirmPasswordErrorElement = errConfirmPassword
  const passwordErrorElement = errPassword
  confirmPasswordErrorElement.innerHTML = ""

  if (!userConfirmPassword) {
    confirmPasswordErrorElement.innerHTML = outputTag[0] + "Preencha a confirmação de senha" + outputTag[1]
    return false
  } else if (userPassword !== userConfirmPassword) {
    passwordErrorElement.innerHTML = outputTag[0] + "As senhas não correspondem" + outputTag[1]
    confirmPasswordErrorElement.innerHTML = outputTag[0] + "As senhas não correspondem" + outputTag[1]
    return false
  }
  return true
}

function fieldValidation (userName, userEmail, userPassword, userConfirmPassword) {
  const isNameValid = nameValidation(userName)
  const isEmailValid = emailValidation(userEmail)
  const isPasswordValid = passwordValidation(userPassword)
  const isConfirmPasswordValid = confirmPasswordValidation(userPassword, userConfirmPassword)

  errPassword.style.height = "1rem"
  errPassword.style.width = "100%"
  errPassword.style.backgroundColor = '#0000'
  errPassword.style.transform = "translateY(0px)"

  errConfirmPassword.style.height = "1rem"
  errConfirmPassword.style.width = "100%"
  errConfirmPassword.style.backgroundColor = '#0000'
  errConfirmPassword.style.transform = "translateY(0px)"

  return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
}

function calculateLevelPassword (type, password) {
  const output = type == "password" ? errPassword : errConfirmPassword
  output.innerHTML = ""

  if (password.length < 6) {
    output.style.height = "1rem"
    output.style.width = "100%"
    output.style.backgroundColor = '#0000'
    output.style.transform = "translateY(0px)"
    return
  }

  const numberRegex = /^[0-9]/
  const lowerLetterRegex = /^[a-z ]/
  const upperLetterRegex = /^[A-Z]/

  let hasNumber = false
  let hasUpperCase = false
  let hasSymbol = false

  let points = 0

  for (let i = 0; i < password.length; i++) {
    if (lowerLetterRegex.test(password[i]))
      continue
    if (numberRegex.test(password[i]))
      hasNumber = true
    else if (upperLetterRegex.test(password[i]))
      hasUpperCase = true
    else
      hasSymbol = true
  }

  points += hasNumber ? 15 : 0
  points += hasUpperCase ? 15 : 0
  points += hasSymbol ? 30 : 0

  if (password.length < 12)
    points += 10
  else if (password.length < 16)
    points += 20
  else
    points += 40

  output.style.transform = "translateY(-9px)"
  output.style.height = "8px"
  output.style.width = points + "%"
  output.style.borderRadius = "9999px"
  output.style.transition = "width 1s ease, background-color 1s ease"
  if (points > 80)
    output.style.backgroundColor = '#471'
  else if (points > 50)
    output.style.backgroundColor = 'var(--color-orange-700)'
  else
    output.style.backgroundColor = '#711'

}

let showPasswordKey = false
let showConfirmPasswordKey = false
const toggleShowPassword = (type) => {
  let showPasswordElement = null
  let passwordElement = null
  let thisPasswordKey = null
  
  if (type == "password") {
    showPasswordElement = showPassword
    passwordElement = inpPassword
    showPasswordKey = !showPasswordKey
    thisPasswordKey = showPasswordKey
  }
  else {
    showPasswordElement = showConfirmPassword
    passwordElement = inpConfirmPassword
    showConfirmPasswordKey = !showConfirmPasswordKey
    thisPasswordKey = showConfirmPasswordKey
  }

  if (thisPasswordKey) {
    showPasswordElement.innerHTML = "<i class='ph ph-eye'></i>"
    passwordElement.type = "text"
  }
  else {
    showPasswordElement.innerHTML = "<i class='ph ph-eye-closed'></i>"
    passwordElement.type = "password"
  }
}

const showToast = (message, situation) => {
  const outputMessage = `<i class="ph ph-${situation ? 'user-check correct' : 'shield-warning error'}"></i><span class='${situation ? 'correct' : 'error'}'>${message}</span>`
  const toast = toastContainer

  toast.innerHTML = outputMessage
  toast.style.bottom = "2rem"
  
  setTimeout(() => {
    toast.style.bottom = "-5rem"
  }, 3000);
}