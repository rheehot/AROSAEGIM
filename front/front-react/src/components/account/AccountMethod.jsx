const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,15}$/,
  nickName: /^[A-Za-z0-9가-힣_]{2,10}$/,
};

export const checkEmail = ( curStr ) => {
  let emailLabel = '이메일'
  let emailValid = 'init'

  if(curStr !== '') {
    if (regExp.email.test(curStr)) {
      emailValid = 'valid'
    }
    else {
      emailLabel = '이메일 양식을 지켜주세요'
      emailValid = 'invalid'
    }
  }
  return { emailLabel, emailValid }
}

export const checkPW = ( curStr ) => {
  let pwLabel = '비밀번호'
  let pwValid = 'init'

  if(curStr !== '') {
    if (regExp.pw.test(curStr)) {
      pwValid = 'valid'
    }
    else {
      pwLabel = '영문, 숫자 조합 6~15자'
      pwValid = 'invalid'
    }
  }
  return { pwLabel, pwValid }
}

export const checkPWCheck = ( curPW, curStr ) => {
  let pwCheckLabel = '비밀번호 확인'
  let pwCheckValid = 'init'

  if(curStr !== '') {
    if (curPW === curStr) {
      pwCheckValid = 'valid'
    }
    else {
      pwCheckLabel = '비밀번호가 일치하지 않습니다.'
      pwCheckValid = 'invalid'
    }
  }
  return { pwCheckLabel, pwCheckValid }
}

export const checkNickName = ( curStr ) => {
  let nickNameLabel = '닉네임'
  let nickNameValid = 'init'

  if(curStr !== '') {
    if (regExp.nickName.test(curStr)) {
      nickNameValid = 'valid'
    }
    else {
      nickNameLabel = "한글, 영문, 숫자, '_' 포함 2~10자"
      nickNameValid = 'invalid'
    }
  }
  return { nickNameLabel, nickNameValid }
}