function makeUI() {
  const frag = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  wrapper.className = 'login-wrapper';

  const title = document.createElement('h6');
  title.textContent = 'login';

  wrapper.append(title);

  frag.append(wrapper);

  document.body.append(frag);
}

function initForm(selector) {
  const el = selector.querySelector('.form-id');
  el.focus();

  const userInput = selector.querySelectorAll('.user-input');

  userInput.forEach((input, index) => {
    // input.addEventListener('keypress', validCheck);
    input.addEventListener('input', validCheck);
  });
}

/**
 *
 * @param {*} event
 * @param {*} role
 * [0,9] [0] : 최소길이, [1] : 최대길이
 * number : 숫자
 * eng : 영어
 * kor : 한글
 * symbol : 특수문자
 * @returns
 */
function validCheck(event, role) {
  if (event.data == null) return;

  const target = event.target;
  const value = target.value;

  const checkRole = [...target.classList].filter(cls =>
    ['number', 'eng', 'kor', 'symbol'].includes(cls)
  );

  const length = [...target.classList].filter(cls => /{.*}/.exec(cls));
  console.log(length);

  console.log(length);

  const genRole = checkRole
    .reduce((makeRole, r) => {
      if (r === 'number') makeRole.push(/0-9/);
      if (r === 'eng') makeRole.push(/a-zA-Z/);
      if (r === 'kor') makeRole.push(/ㄱ-ㅎ|ㅏ-ㅣ|가-힣/);

      return makeRole;
    }, [])
    .map(reg => reg.source)
    .join('');

  if (new RegExp(`^(.)${length}$`, 'gi').test(value)) {
    const regExp = new RegExp(`[^${genRole}]${length}$`, 'gi');
    target.value = value.replace(regExp, '');
  } else {
    target.value = value.slice(0, value.length - 1);
  }
}

const loginLib = {
  makeUI,
  initForm
};

export default loginLib;
